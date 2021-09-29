import { Component, OnDestroy, OnInit } from '@angular/core';
import { Firestore, collection } from '@angular/fire/firestore';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { MenuLink } from 'src/app/_interfaces/menu-link.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<void>();
  
  activateLink$ = new BehaviorSubject<string>('products');
  menuLinks: MenuLink[] = [
    { display: 'MAIN_MENU.PRODUCTS', url: 'products' },
    { display: 'MAIN_MENU.CONNECT_US', url: 'connect-us' },
  ];

  constructor(
    private router: Router,
    private translateService: TranslateService,
    private firestore: Firestore
  ) { }

  ngOnInit(): void {

    this.translateService.use('zh');

    this.subscribeActivateLinkByUrlChange();

    // const c = collection(this.firestore, 'test');
    // console.log(c.id)
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  goto = (link: MenuLink): void => {
    this.router.navigate([link.url]);
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
