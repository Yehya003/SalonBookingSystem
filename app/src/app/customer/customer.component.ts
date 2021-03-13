import { Component, OnInit } from '@angular/core';
import {AdminService } from '../admin.service';
import { mergeMap } from 'rxjs/operators';
import { User } from 'src/User';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit {

  public successMsg!: string;
  public errorMsg!: string;
  name!: string;
  email!: string;
  password!: string;
  isAdmin!: boolean;
  
  constructor(public adminService: AdminService) { }

  ngOnInit() {
  }
  
  addCustomer() {
    this.successMsg = "";
    this.errorMsg = "";
    this.adminService.addCustomer(this.name, this.email, this.password, this.isAdmin)
    .subscribe((addCustomer: User) => {
      this.name = '';
      this.email ='';
      this.password ='';
      this.successMsg = 'Customer Added!';
    },
    (error: ErrorEvent) => {
      this.errorMsg = error.error.message;
    });
    
  }


}
