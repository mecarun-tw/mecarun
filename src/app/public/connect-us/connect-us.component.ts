import { Component, OnInit } from '@angular/core';
import { ExternalLink, getExternalLinkIconUrl } from 'src/app/_interfaces/external-link.interface';

@Component({
  selector: 'app-connect-us',
  templateUrl: './connect-us.component.html',
  styleUrls: ['./connect-us.component.scss']
})
export class ConnectUsComponent implements OnInit {

  externalLinks: ExternalLink[] = [
    { site: 'MECARUN', externalUrl: 'https://www.mecarun.fr'},
    { site: 'RUTEN', externalUrl: 'https://www.ruten.com.tw/store/danili51100/'},
    { site: 'SHOPEE', externalUrl: 'https://shopee.tw/queen_japan'},
    { site: 'FB', externalUrl: 'https://business.facebook.com/mecarunP18/'},
  ];

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  _getExternalLinkIconUrl = (site: string) => {
    return getExternalLinkIconUrl(site) as string;
  }
}
