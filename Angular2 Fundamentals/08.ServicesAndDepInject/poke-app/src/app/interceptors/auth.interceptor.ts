import {Injectable} from '@angular/core';

import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.method === 'GET') {
      req = req.clone({
        headers: req.headers
          .set('Authorization', sessionStorage.getItem('authtoken'))
          .set('Content-Type', 'application/json')
      });

      return next.handle(req);
    }


  }


}
