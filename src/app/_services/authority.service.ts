import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginComponent } from 'src/app/_elements/dialogs/login/login.component';
import { Api } from 'src/app/_api/mock.api';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthorityService implements CanActivate {

  constructor(
    private matDialog: MatDialog,
    private router: Router,
    private api: Api,
    private cookieService: CookieService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.cookieService.get('permision') === 'administrator') {
      this.resetPermissionCookie();
      return true;
    } else {
      return this.matDialog.open(LoginComponent).afterClosed().pipe(
        tap(result => {
          if (result) {
            this.resetPermissionCookie();
          } else {
            this.router.navigate(['public', 'products']);
          }
        })
      );
    }
  }

  login = (token: string) => {
    return this.api.login(token);
  }

  private resetPermissionCookie = () => {
    const expiresDate = new Date();
    expiresDate.setMinutes(expiresDate.getMinutes() + 10);
    this.cookieService.set('permision', 'administrator', {expires: expiresDate});
  }
}
