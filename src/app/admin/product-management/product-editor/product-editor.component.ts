import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { filter, first, map, switchAll, takeUntil } from 'rxjs/operators';
import { Product, ProductKey } from 'src/app/_interfaces/product.interface';
import { ProductsService } from 'src/app/_services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss']
})
export class ProductEditorComponent implements OnInit, OnDestroy {

  @ViewChild('thumbnail') thumbnailElement!: ElementRef;
  @ViewChild('image') imageElement!: ElementRef;

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
    private renderer2: Renderer2
  ) { }

  ngOnInit(): void {
    this.productFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      language: ['', Validators.required],
      price: ['', Validators.required],
      shortDescription: ['', Validators.required],
      description: ['', Validators.required],
      thumbnailUrl: [''],
      imageUrl: [''],
    });

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
        this.productFormGroup.setValue({
          name: product.name,
          language: product.language,
          price: product.price,
          shortDescription: product.shortDescription,
          description: product.description,
          thumbnailUrl: product.thumbnailUrl,
          imageUrl: product.imageUrl,
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
        thumbnailUrl: this.productFormGroup.get('thumbnailUrl')?.value,
        imageUrl: this.productFormGroup.get('imageUrl')?.value,
        externalLinks: []
      } as Product;

      if (this.uuid && this.productId) {
        product.uuid = this.uuid;
        product.productId = this.productId;
        this.productsService.updateProduct(product).then(() => {
          this.router.navigate(['admin', 'product-management']);
        });
      } else { //create
        this.productsService.createProduct(product).then(() => {
          this.router.navigate(['admin', 'product-management']);
        });
      }
    }
  }

  onFileChange = (e: any, type: string) => {
    
    const file: File = e.target.files[0];
    
    if (file) {
      const fileReader = new FileReader();
      fileReader.addEventListener('load', fileReaderEvent => {

        const image = new Image();
        image.addEventListener('load', () => {

          const maxWidth = type === 'thumbnail' ? environment.IMAGE_SIZE.THUMBNAIL_MAX_WIDTH : environment.IMAGE_SIZE.IMAGE_MAX_WIDTH;
          const maxHeight = type === 'thumbnail' ? environment.IMAGE_SIZE.THUMBNAIL_MAX_HEIGHT : environment.IMAGE_SIZE.IMAGE_MAX_HEIGHT;
          let width = image.width;
          let height = image.height;
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
          const dataUrl = canvas.toDataURL();

          const element = type === 'thumbnail' ? this.thumbnailElement : this.imageElement;
          this.renderer2.setStyle(element.nativeElement, 'width', width + 'px');
          this.renderer2.setStyle(element.nativeElement, 'height', height + 'px');
          element.nativeElement.src = dataUrl;
        });

        image.src = fileReaderEvent.target?.result as string;
      });

      fileReader.readAsDataURL(file);
    }
  }

}
