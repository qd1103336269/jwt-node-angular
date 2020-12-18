import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  public data: any[];

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    let token = localStorage.getItem('token')
    // console.log(token)

  }
  getdata() {
    this.http.get('http://localhost:3000/get').subscribe(res => {
      // console.log(JSON.parse(JSON.stringify(res)).statusCode)
      let code = JSON.parse(JSON.stringify(res)).code
      if ( code !== 200) {

        this.router.navigate(['/login'])
      }
      this.data = JSON.parse(JSON.stringify(res)).data;
      // if(res.status === 500) {
      //   alert('token过期')
      // }
    })
  }

}
