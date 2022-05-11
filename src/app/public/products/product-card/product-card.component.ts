import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductKey } from 'src/app/_interfaces/product.interface';
import { ImagesService } from 'src/app/_services/images.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() productKey!: ProductKey;

  constructor(
    private router: Router,
    private imagesService: ImagesService
  ) { }

  ngOnInit(): void { }

  gotoProduct = (): void => {
    this.router.navigate(['public', 'product', this.productKey.productId]);
  }

  getImageUrl = (imageUuid: string) => {
    return this.imagesService.getImageUrl(imageUuid);
  }
}
