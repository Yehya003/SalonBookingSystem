import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from 'src/User';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public successMsg!: string;
  public errorMsg!: string;
  email!: string;
  password!: string;
  isAdmin: boolean | undefined;

  constructor(public adminService: AdminService, private router: Router) {}

  ngOnInit() {}

  signIn() {
    var validation = this.validateInput();
    if (validation){
    this.adminService.signIn(this.email, this.password).subscribe(
      (res) => {
        localStorage.setItem('token', res.token);
        this.isAdmin = res.admin;
        this.successMsg = `Logged in successfully`;

        if (this.isAdmin === true) {
          this.email = '';
          this.password = '';
          this.successMsg = 'You are logged in!';
          this.router.navigate(['/manageCustomer']);
        } else {
          this.email = '';
          this.password = '';
          this.successMsg = 'You are logged in!';
          this.router.navigate(['/booking']);
        }
        
      },
      (err) => {
        console.log(err)
        this.errorMsg = 'Invalid login, try again';
      }
      
    );
    }
  }

  validateInput() {
    var theEmail = false;
    var thePassword = false;
    //email and pwd regex expression code
    var pwd_expression = /^(?=.*?[0-9])/;
    var letters = /^[A-Za-z]+$/;
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (this.email == '') {
      alert('Please enter your email');
    } else if (!filter.test(this.email)) {
      alert('Invalid email');
    } else if (this.password == '') {
      alert('Please enter password');
    } else if (!pwd_expression.test(this.password)) {
      alert('Please enter password');
    } else {
      theEmail=true;
      thePassword=true;
      // if I want to Redirecting to other page or webste code.
      //window.location = "http://www.campuslife.co.in";
    }
    if (theEmail && thePassword) {
      return true;
    } else {
      return false;
    }
  }
}
