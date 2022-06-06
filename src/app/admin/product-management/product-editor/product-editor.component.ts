import { AfterContentInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
export class ProductEditorComponent implements OnInit, AfterContentInit, OnDestroy {

  @ViewChild('thumbnail') thumbnailElement!: ElementRef;
  @ViewChild('image') productImageElement!: ElementRef;

  uuid: string|null = null;
  productId: string|null = null;
  productFormGroup!: FormGroup;
  initImageUuid: {[key: string]: string|null} = {
    'thumbnailUuid': null,
    'productImageUuid': null,
  }
  languages = environment.languages;
  externalLinkSites = environment.EXTERNAL_LINK_SITES;
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
      language: [{value: '', disabled: true}],
      price: ['', Validators.required],
      shortDescription: [''],
      description: [''],
      externalLinks: this.formBuilder.array([]),
      thumbnailUuid: [''],
      productImageUuid: [''],
    });
  }
  
  ngAfterContentInit(): void {
    this.activatedRoute.paramMap.pipe(
      map(paramMap => paramMap.get('uuid')),
      first(),
      map(uuid => {
        if (uuid === null) {
          return of(null)
        } else {
          return this.productsService.getProductByUuid(uuid).pipe(filter(product => product !== null), first());
        }
      }),
      switchAll()
    ).subscribe(product => {
      if (product) { // edit
        this.uuid = product.uuid;
        this.productId = product.productId;
        this.initImageUuid['thumbnailUuid'] = product.thumbnailUuid;
        this.initImageUuid['productImageUuid'] = product.productImageUuid;
  
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
  
        product.externalLinks.forEach(() => this.addExternalLink());

        this.productFormGroup.setValue({
          name: product.name,
          language: product.language,
          price: product.price,
          shortDescription: product.shortDescription,
          description: product.description,
          externalLinks: product.externalLinks,
          thumbnailUuid: product.thumbnailUuid,
          productImageUuid: product.productImageUuid,
        }, { emitEvent: false});
      } else { // create
        this.activatedRoute.queryParams.pipe(
          first()
        ).subscribe(params => {
          this.productFormGroup.get('language')?.setValue(params.language);
          if (product === undefined) {
            this.productId = params.productId;
          }
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
    this.requiredValidator('shortDescription');
    this.requiredValidator('description');
    this.requiredValidator('thumbnailUuid');
    this.requiredValidator('productImageUuid');

    if (this.productFormGroup.valid) {
      const product = {
        uuid: '',
        productId: this.productId ? this.productId : '',
        name: this.productFormGroup.get('name')?.value,
        language: this.productFormGroup.get('language')?.value,
        price: this.productFormGroup.get('price')?.value,
        shortDescription: this.productFormGroup.get('shortDescription')?.value,
        description: this.productFormGroup.get('description')?.value,
        thumbnailUuid: this.productFormGroup.get('thumbnailUuid')?.value,
        productImageUuid: this.productFormGroup.get('productImageUuid')?.value,
        externalLinks: (this.productFormGroup.get('externalLinks') as FormArray).getRawValue(),
      } as Product;

      if (this.uuid && this.productId) { // edit
        if (this.productFormGroup.dirty) {
          Promise.all([
            this.uploadImageByControlName('thumbnailUuid'),
            this.uploadImageByControlName('productImageUuid')
          ]).then(() => {
            product.uuid = this.uuid as string;
            product.productId = this.productId as string;
            product.thumbnailUuid = this.productFormGroup.get('thumbnailUuid')?.value;
            product.productImageUuid = this.productFormGroup.get('productImageUuid')?.value;
            this.productsService.updateProduct(product).then(() => {
              this.router.navigate(['admin', 'product-management']);
            });
          });
        } else { // form is not dirty
          this.router.navigate(['admin', 'product-management']);
        }
      } else { //create
        Promise.all([
          this.uploadImageByControlName('thumbnailUuid'),
          this.uploadImageByControlName('productImageUuid')
        ]).then(() => {
          product.thumbnailUuid = this.productFormGroup.get('thumbnailUuid')?.value;
          product.productImageUuid = this.productFormGroup.get('productImageUuid')?.value;
          this.productsService.createProduct(product).then(() => {
            this.router.navigate(['admin', 'product-management']);
          });
        });
      }
    } else { //not valid
      this.productFormGroup.markAllAsTouched(); this.productFormGroup.get('shortDescription')?.hasError('required')
    }
  }

  addExternalLink = () => {
    const externalLinksControls = this.productFormGroup.get('externalLinks') as FormArray;
    externalLinksControls.push(this.formBuilder.group({
      site: ['', Validators.required],
      externalUrl: ['', Validators.required],
    }));
  }

  getExternalLinksControls = () => {
    return (this.productFormGroup.get('externalLinks') as FormArray).controls;
  }

  removeExternalLink = (index: number) => {
    (this.productFormGroup.get('externalLinks') as FormArray).removeAt(index);
    this.productFormGroup.markAsDirty();
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
      formControl?.setValue('NEW_IMAGE_UUID');
      formControl?.markAsDirty();
    }
  }

  private setImageElement = (dataUrl: string, controlName: string) => {
    const image = new Image();
    image.addEventListener('load', () => {
      const [maxWidth, maxHeight] = this.getMaxSizeByControlName(controlName);
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

      const element = this.getImageElementByControlName(controlName)
      this.renderer2.setStyle(element, 'width', width + 'px');
      this.renderer2.setStyle(element, 'height', height + 'px');
      element.src = dataUrl;
    });

    image.src = dataUrl;
  }

  private getImageElementByControlName = (controlName: string) => {
    let element = null;
    if (controlName === 'thumbnailUuid') {
      element = this.thumbnailElement.nativeElement;
    }
    if (controlName === 'productImageUuid') {
      element = this.productImageElement.nativeElement;
    }
    return element;
  }

  private getMaxSizeByControlName = (controlName: string) => {
    let maxWidth = 0;
    let maxHeight = 0;
    if (controlName === 'thumbnailUuid') {
      maxWidth = environment.IMAGE_SIZE.THUMBNAIL_MAX_WIDTH;
      maxHeight = environment.IMAGE_SIZE.THUMBNAIL_MAX_HEIGHT;
    }
    if (controlName === 'productImageUuid') {
      maxWidth = environment.IMAGE_SIZE.IMAGE_MAX_WIDTH;
      maxHeight = environment.IMAGE_SIZE.IMAGE_MAX_HEIGHT;
    }
    return [maxWidth, maxHeight];
  }

  private uploadImageByControlName = (controlName: string): Promise<void>[] => {
    const promises: Promise<void>[] = [];
    const control = this.productFormGroup.get(controlName);
    const element = this.getImageElementByControlName(controlName);
    if (control?.dirty) {
      if (this.initImageUuid[controlName]) {
        promises.push(this.imagesService.deleteImage(this.initImageUuid[controlName] as string));
      }
      promises.push(this.imagesService.uploadImage(element.src).then(imageUuid => control?.setValue(imageUuid)));
    }
    return promises;
  }

  private requiredValidator = (controlName: string) => {
    const control = this.productFormGroup.get(controlName);
    if (!control?.value) {
      control?.setErrors({required: true});
    }
  }
}
