import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router'
import { HttpClient } from '@angular/common/http';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  public userValue: string = '';
  public pwdValue: string = '';
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
    ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],

    });
  }

  login() {
    this.http.post("http://localhost:3000/login", {username: this.userValue, password: this.pwdValue}, {}).subscribe((res: any) => {
      console.log(res)
      if(res.code === 401) {

        this.router.navigate(['/login'])
      }else if(res.code === 200) {
        localStorage.setItem('token', res.token)
      this.router.navigate(['/home'])
      }

    })
  }
  register() {
    this.http.post("http://localhost:3000/register", {username: this.userValue, password: this.pwdValue}, {}).subscribe((res: any) => {
      console.log(res)
      if(res.code !== 200) {
        alert('注册失败')
        this.router.navigate(['/login'])
      }else if(res.code === 200) {
        alert('注册成功请登录')
        this.router.navigate(['/login'])
      }

    })
  }
  userInputHandle(e) {
    // console.log(e.target.value)
    this.userValue = e.target.value
  }
  pwdInputHandle(e) {
    this.pwdValue = e.target.value
    // console.log(e.target.value)
  }

}
