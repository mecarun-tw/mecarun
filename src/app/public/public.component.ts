import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { MenuLink } from 'src/app/_interfaces/menu-link.interface';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<void>();
  
  activateLink$ = new BehaviorSubject<string>('public/products');
  menuLinks: MenuLink[] = [
    { display: 'PUBLIC.MAIN_MENU.PRODUCTS', url: 'public/products' },
    { display: 'PUBLIC.MAIN_MENU.POINTS_OF_SALE', url: 'public/points-of-sale' },
    { display: 'PUBLIC.MAIN_MENU.CONNECT_US', url: 'public/connect-us' },
  ];

  constructor(
    private router: Router,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {

    this.translateService.use('zh');

    this.subscribeActivateLinkByUrlChange();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleLanguage = () => {
    if (this.translateService.currentLang === 'zh') {
      this.translateService.use('en');
    } else {
      this.translateService.use('zh');
    }
  }

  private subscribeActivateLinkByUrlChange = ():void => {
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(e => e.url),
      takeUntil(this.destroy$)
    ).subscribe(url => {
      this.menuLinks.some(link => {
        if (url.includes(link.url)) {
          this.activateLink$.next(link.url);
          return true;
        } else {
          return false;
        }
      });
    });
  }

}
