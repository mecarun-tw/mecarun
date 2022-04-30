import { Component, OnInit } from '@angular/core';
import { ExternalLink } from 'src/app/_interfaces/external-link.interface';

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
    { imageUrl: 'assets/images/fb-icon.png', externalUrl: 'https://business.facebook.com/mecarunP18/'},
  ];

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

}
