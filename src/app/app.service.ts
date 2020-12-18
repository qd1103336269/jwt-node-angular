import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
const ignoreToken = ['login'];
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private router: Router
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log(next);
    // 补全地址
    let url = req.url;
    const needToken = ignoreToken.filter(u => url.match(u));
    // console.log(needToken); // ['evironment']
    if (url.indexOf('http://') < 0 || url.indexOf('https://') < 0) {

      // console.log(url); // http://../../../assets/json/evironment.details.json
    }
    // 设置token的请求头
    // 获取token值(可以从本地缓存里得到)
    let token = localStorage.getItem('token')
    const authToken = token;
    if (authToken) {
      // 服务请求时所有的请求加入token
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + authToken),
        url: req.url
      });
      // 服务器响应结果
      return next.handle(authReq).pipe(tap(event => {
        // console.log(event)
        if (event instanceof HttpResponse) {
          this.handleData(event);
        }
      }, error => {
        // alert(error.error)
        this.handleData(error)

      }));
    } else {
      this.router.navigate(['/login'])
    }
    // 若token不存在，则不对请求进行处理
    // return next.handle(req).pipe(tap(event => {
    //     if (event instanceof HttpResponse) {
    //         // console.log(event);
    //         this.handleData(event);
    //     }
    // }, error => {
    //     console.log(error)
    // }));
  }
  handleData(event: HttpResponse<any> | HttpErrorResponse): Observable<any> {
    // console.log(event)
    // 业务处理：一些通用操作
    switch (event.status) {
      case 200:
        if (event instanceof HttpResponse) {
          alert(event.body.msg)
        }
        break;
      case 401: // 未登录状态码
        if (event instanceof HttpErrorResponse) {
          alert(event.error.msg)
          this.router.navigate(['/login'])
        }
        break;
      case 404:
        if (event instanceof HttpErrorResponse) {
          alert(event.error.msg)
          this.router.navigate(['/login'])
        }
      case 500:
        if (event instanceof HttpErrorResponse) {
          alert(event.error.msg)
          this.router.navigate(['/login'])
        }
        break;
      default:
        return of(event);
    }
  }
}
