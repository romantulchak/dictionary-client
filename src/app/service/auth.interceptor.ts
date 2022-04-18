import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {tap} from 'rxjs/operators';

import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { Router } from '@angular/router';
import { RouterConstant } from '../constants/router.constant';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService,
              private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, `Bearer ${token}`) });
    }
    return next.handle(authReq).pipe(
      tap(
        () => {},
        error => {
          switch (error.status) {
            case 401:
              localStorage.clear();
              this.router.navigateByUrl(`${RouterConstant.AUTH_URL}/${RouterConstant.LOGIN_URL}`);
              break;
            case 403:
              this.router.navigateByUrl(`${RouterConstant.HOME_URL}`);
              break;
            case 500:
              this.router.navigateByUrl(`${RouterConstant.TECHNICAL_PROBLEM_URL}`);
          }
        })
    );
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
