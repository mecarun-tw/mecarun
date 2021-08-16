import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { MenuLink } from 'src/app/_interfaces/menu-link';

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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscribeActivateLinkByUrlChange();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  goto = (link: MenuLink): void => {
    this.router.navigate([link.url]);
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
