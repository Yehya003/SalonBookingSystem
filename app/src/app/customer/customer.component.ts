import { Component, OnInit } from '@angular/core';
import {AdminService } from '../admin.service';
import { mergeMap } from 'rxjs/operators';
import { User } from 'src/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  public successMsg!: string;
  public errorMsg!: string;
  name!: string;
  email!: string;
  password!: string;
  isAdmin!: boolean;
  appointmentId!: number;
  appointmentDate!: string;

  constructor(public adminService: AdminService, private router: Router) {}

  ngOnInit() {}

  addCustomer() {
    var validation = this.validateInput();
    if(validation){
    this.successMsg = '';
    this.errorMsg = '';

    this.adminService
      .addCustomer(
        this.name,
        this.email,
        this.password,
        this.isAdmin,
        this.appointmentId,
        this.appointmentDate
      )
      .subscribe(
        (addCustomer: User) => {
          this.name = '';
          this.email = '';
          this.password = '';
          this.successMsg = 'Customer Added!';
          this.router.navigate(['/login']);
        },
        (error: ErrorEvent) => {
          this.errorMsg = error.error.message;
        }
      );
    }
  }

  validateInput() {
    var theName = false;
    var theEmail = false;
    var thePassword = false;
    //email and pwd regex expression code
    var pwd_expression = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;
    var letters = /^[A-Za-z]+$/;
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (this.email == '') {
      alert('Please enter your email');
    } else if (!filter.test(this.email)) {
      alert('Invalid email');
    } else if (this.password == '') {
      alert('Please enter password');
    } else if (!pwd_expression.test(this.password)) {
      alert('Password must include at least one A-Z, a-z, number and one special character e.x. #?!@$%^&*- ');
    } else if (this.name == ''){
      alert('Please enter your name');
    } else if (!letters.test(this.name)){
      alert('Name must inculde alphabit');
    }else {
      theEmail = true;
      thePassword = true;
       theName = true;
      // if I want to Redirecting to other page or webste code.
      //window.location = "http://www.campuslife.co.in";
    }
    if (theEmail && thePassword && theName ) {
      return true;
    } else {
      return false;
    }
  }
}
