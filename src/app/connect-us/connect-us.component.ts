import { Component, OnInit } from '@angular/core';
import { ExternalLink } from '../_interfaces/external-link';

@Component({
  selector: 'app-connect-us',
  templateUrl: './connect-us.component.html',
  styleUrls: ['./connect-us.component.scss']
})
export class ConnectUsComponent implements OnInit {

  externalLinks: ExternalLink[] = [
    { imageUrl: 'assets/images/mecarun-icon.png', externalUrl: 'https://www.mecarun.fr'},
    { imageUrl: 'assets/images/ruten-icon.png', externalUrl: 'https://www.ruten.com.tw'},
    { imageUrl: 'assets/images/shopee-icon.png', externalUrl: 'https://shopee.tw'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
