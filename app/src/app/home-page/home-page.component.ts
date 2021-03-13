import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from 'src/User';
import { AdminService } from '../admin.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public successMsg!:string;
  public errorMsg!: string;
  email!: string;
  password!: string;
  loading: boolean;
  
  constructor(public adminService: AdminService) { }

  ngOnInit() {
  }
  
  signIn() {

   this.adminService.signIn(this.email, this.password).pipe(first())
    .subscribe((data: HttpResponse<any>) => {
      console.log(data.headers.get('token'));
    },
    error => {
      this.loading = false;
    });
    
      this.email ='';
      this.password ='';
      this.successMsg = 'You are logged in!';
    
    (error: ErrorEvent) => {
      this.errorMsg = error.error.message;
      this.errorMsg = 'Wrong try again!'
    });
    
  }
}
