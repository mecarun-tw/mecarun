import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductKey } from 'src/app/_interfaces/product.interface';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() productKey!: ProductKey;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void { }

  gotoProduct = (): void => {
    this.router.navigate(['product', this.productKey.uuid]);
  }

}
