import { Component, OnInit } from '@angular/core';
import { ExternalLink } from '../_interfaces/external-link.interface';

@Component({
  selector: 'app-connect-us',
  templateUrl: './connect-us.component.html',
  styleUrls: ['./connect-us.component.scss']
})
export class ConnectUsComponent implements OnInit {

  externalLinks: ExternalLink[] = [
    { imageUrl: 'assets/images/mecarun-icon.png', externalUrl: 'https://www.mecarun.fr'},
    { imageUrl: 'assets/images/ruten-icon.png', externalUrl: 'https://www.ruten.com.tw/store/danili51100/'},
    { imageUrl: 'assets/images/shopee-icon.png', externalUrl: 'https://shopee.tw/queen_japan'},
    { imageUrl: 'assets/images/pcstore-icon.png', externalUrl: 'https://seller.pcstore.com.tw/S167293963/'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
