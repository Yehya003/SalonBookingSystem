/*
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/User";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<User>,
    next: HttpHandler
  ): Observable<HttpEvent<User>> {
    const idToken = localStorage.getItem('id_token');
    console.log(idToken);

    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + idToken),
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
 */
import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AdminService } from './admin.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}
  intercept(req: { clone: (arg0: { headers: any; }) => any; headers: { set: (arg0: string, arg1: string) => any; }; }, next: { handle: (arg0: any) => any; }) {
        const idToken = localStorage.getItem('token');
    let authService = this.injector.get(AdminService);
    let tokenizedReq = req.clone({
      headers: req.headers.set(
        'Authorization',
        'bearer ' + idToken
      ),
    });
    return next.handle(tokenizedReq);
  }
}