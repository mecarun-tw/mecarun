import { Component, Input, OnInit } from '@angular/core';
import { ProductKey } from 'src/app/_interfaces/product.interface';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() productKey!: ProductKey;

  constructor() { }

  ngOnInit(): void {
  }

}
