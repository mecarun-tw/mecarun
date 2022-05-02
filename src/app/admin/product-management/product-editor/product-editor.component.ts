import { Component, OnDestroy, OnInit } from '@angular/core';
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

  uuid: string|null = null;
  productId: string|null = null;
  productFormGroup!: FormGroup;
  languages = environment.languages;
  destroy$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private formBuilder: FormBuilder,
    private router: Router
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

      if (this.uuid) {
      } else { //create
        this.productsService.createProduct(product).then(product$ => {
          this.router.navigate(['admin', 'product-management']);
        });
      }
    }
  }

}
