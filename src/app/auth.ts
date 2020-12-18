import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
const ignoreToken = ['login', 'envirment'];
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req)
    let url = req.url;
    const needTokenUrl = ignoreToken.filter(u => url.match(u))
    console.log(needTokenUrl)
    return next.handle(req).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            console.log(event);
            if (event.status >= 500) {

            }
          }
        },
        error => {

        })
    );
  }
}
