import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { filter, first, map, switchAll } from 'rxjs/operators';
import { Product } from 'src/app/_interfaces/product.interface';
import { ImagesService } from 'src/app/_services/images.service';
import { ProductsService } from 'src/app/_services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss']
})
export class ProductEditorComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('thumbnail') thumbnailElement!: ElementRef;
  @ViewChild('image') productImageElement!: ElementRef;

  uuid: string|null = null;
  productId: string|null = null;
  productFormGroup!: FormGroup;
  languages = environment.languages;
  destroy$ = new Subject<void>();

  quillEditorModols = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
  
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
  
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'align': [] }],
  
      ['clean'],                                         // remove formatting button
    ]
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private renderer2: Renderer2,
    private imagesService: ImagesService
  ) { }

  ngOnInit(): void {
    this.productFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      language: ['', Validators.required],
      price: ['', Validators.required],
      shortDescription: ['', Validators.required],
      description: ['', Validators.required],
      thumbnailUuid: ['', Validators.required],
      productImageUuid: ['', Validators.required],
    });

  }
  
  ngAfterViewInit(): void {
    this.activatedRoute.paramMap.pipe(
      map(paramMap => paramMap.get('uuid')),
      first(),
      map(uuid => {
        if (uuid === null) {
          return of(null)
        } else {
          return this.productsService.getProductByUuid(uuid).pipe(
            filter(product => !!product),
            map(product => product)
          );
        }
      }),
      switchAll()
    ).subscribe(product => {
      if (product) {
        this.uuid = product.uuid;
        this.productId = product.productId;
  
        this.imagesService.getImageUrl(product.productImageUuid).pipe(
          filter(imageUrl => !!imageUrl),
          map(imageUrl => imageUrl as string),
          first()
        ).subscribe(imageUrl => this.setImageElement(imageUrl, 'productImageUuid'));
  
        this.imagesService.getImageUrl(product.thumbnailUuid).pipe(
          filter(imageUrl => !!imageUrl),
          map(imageUrl => imageUrl as string),
          first()
        ).subscribe(imageUrl => this.setImageElement(imageUrl, 'thumbnailUuid'));
  
        this.productFormGroup.setValue({
          name: product.name,
          language: product.language,
          price: product.price,
          shortDescription: product.shortDescription,
          description: product.description,
          thumbnailUuid: product.thumbnailUuid,
          productImageUuid: product.productImageUuid,
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cancel = () => {
    this.router.navigate(['admin', 'product-management']);
  }

  submit = () => {
    if (this.productFormGroup.valid) {
      const product = {
        uuid: '',
        productId: '',
        name: this.productFormGroup.get('name')?.value,
        language: this.productFormGroup.get('language')?.value,
        price: this.productFormGroup.get('price')?.value,
        shortDescription: this.productFormGroup.get('shortDescription')?.value,
        description: this.productFormGroup.get('description')?.value,
        thumbnailUuid: this.productFormGroup.get('thumbnailUuid')?.value,
        productImageUuid: this.productFormGroup.get('productImageUuid')?.value,
        externalLinks: []
      } as Product;

      if (this.uuid && this.productId && this.productFormGroup.dirty) {
        const promises: Promise<void>[] = [];

        const thumbnailUuidControl = this.productFormGroup.get('thumbnailUuid');
        if (thumbnailUuidControl?.dirty) {
          promises.push(
            this.imagesService.deleteImage(thumbnailUuidControl?.value),
            this.imagesService.uploadImage(this.thumbnailElement.nativeElement.src).then(imageUuid => {
              thumbnailUuidControl?.setValue(imageUuid);
            })
          );
        }

        const productImageUuidControl = this.productFormGroup.get('productImageUuid');
        if (productImageUuidControl?.dirty) {
          promises.push(
            this.imagesService.deleteImage(productImageUuidControl?.value),
            this.imagesService.uploadImage(this.productImageElement.nativeElement.src).then(imageUuid => {
              productImageUuidControl?.setValue(imageUuid);
            })
          );
        }

        Promise.all(promises).then(() => {
          product.uuid = this.uuid as string;
          product.productId = this.productId as string;
          product.thumbnailUuid = thumbnailUuidControl?.value;
          product.productImageUuid = productImageUuidControl?.value;
          this.productsService.updateProduct(product).then(() => {
            this.router.navigate(['admin', 'product-management']);
          });
        });
      } else { //create
        this.productsService.createProduct(product).then(() => {
          this.router.navigate(['admin', 'product-management']);
        });
      }
    }
  }

  onFileChange = (fileChangeEvent: any, controlName: string) => {
    
    const file: File = fileChangeEvent.target.files[0];
    
    if (file) {
      const fileReader = new FileReader();
      fileReader.addEventListener('load', fileReaderEvent => {
        this.setImageElement(fileReaderEvent.target?.result as string, controlName)
      });

      fileReader.readAsDataURL(file);
      const formControl = this.productFormGroup.get(controlName);
      formControl?.markAsDirty();
    }
  }

  setImageElement = (dataUrl: string, controlName: string) => {
    const image = new Image();
    image.addEventListener('load', () => {
      const maxWidth = controlName === 'thumbnailUuid' ? environment.IMAGE_SIZE.THUMBNAIL_MAX_WIDTH : environment.IMAGE_SIZE.IMAGE_MAX_WIDTH;
      const maxHeight = controlName === 'thumbnailUuid' ? environment.IMAGE_SIZE.THUMBNAIL_MAX_HEIGHT : environment.IMAGE_SIZE.IMAGE_MAX_HEIGHT;
      let width = image.width;
      let height = image.height;

      if (width > maxWidth || height > maxHeight) { // need to resize
        if (width > maxWidth) {
          height = Math.floor(height * maxWidth / width);
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = Math.floor(width * maxHeight / height);
          height = maxHeight;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext('2d');

        context?.drawImage(image, 0, 0, width, height);
        dataUrl = canvas.toDataURL();
      }

      const element = controlName === 'thumbnailUuid' ? this.thumbnailElement : this.productImageElement;
      this.renderer2.setStyle(element.nativeElement, 'width', width + 'px');
      this.renderer2.setStyle(element.nativeElement, 'height', height + 'px');
      element.nativeElement.src = dataUrl;
    });

    image.src = dataUrl;
  }
}
