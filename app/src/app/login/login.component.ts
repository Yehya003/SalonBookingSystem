import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from 'src/User';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public successMsg!:string;
  public errorMsg!: string;
  email!: string;
  password!: string;
  isAdmin: boolean = false;
  
  
  constructor(public adminService: AdminService, private router: Router) { }

  ngOnInit() {
  }

  signIn() {
    this.adminService.signIn(this.email, this.password).subscribe(
      res => {
        localStorage.setItem('token', res.token)
      },
      err => console.log(err)
    ) 
  
    if (this.isAdmin === true){
      this.email = '';
      this.password = '';
      this.successMsg = 'You are logged in!';
      this.router.navigate(['/manageCustomer']);


    } else {
      this.email = '';
      this.password = '';
      this.successMsg = 'You are NOT logged in!';
      this.router.navigate(['/booking']);
    } 
    
  }

}
