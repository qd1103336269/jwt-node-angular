import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
const ignoreToken = ['login'];
@Injectable()
export class CommonInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 先补全请求协议
    let url = req.url;
    const needToken = ignoreToken.filter(u => url.match(u));
    if (url.indexOf('http://') < 0 || url.indexOf('http://') < 0) {
      url = 'http://' + url;
    }
    // 过滤掉不需要token的请求
    if (!needToken.length) {
      req = req.clone({
        url
      });
    } else {

      req = req.clone({
        url,
        headers: req.headers.set('token', localStorage.getItem('token'))
      });
    }
    return next.handle(req).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            console.log(event);
            if (event.status >= 500) {
              // 跳转错误页面
            }
          }
        },
        error => {
          // token过期 服务器错误等处理

        })
    );
  }
}
