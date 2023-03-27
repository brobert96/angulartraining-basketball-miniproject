import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authKey: string =
    'c5fe6457camshf8b27ef227b73dbp196bf3jsn367b4ba495cd';
  private authHost: string = 'free-nba.p.rapidapi.com';

  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let newReq = req.clone({
      setHeaders: {
        'X-RapidAPI-Key': this.authKey,
        'X-RapidAPI-Host': this.authHost,
      },
    });
    return next.handle(newReq);
  }
}
