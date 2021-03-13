import { Component, OnInit } from '@angular/core';
import {AdminService } from '../admin.service';
import { mergeMap } from 'rxjs/operators';

import { stringify } from '@angular/compiler/src/util';
import { User } from 'src/User';
@Component({
  selector: 'app-manage-customer',
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.css']
})
export class ManageCustomerComponent implements OnInit {

  public successMsg!: string;
  public errorMsg!: string;
  public loading = true;
  public customers: User[] = [];
  public columns = ['id', 'name','email', 'appointment','delete','update'];
  
  constructor(public adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getAllCustomer()
    .subscribe((customers:User[]) => {
      this.customers = customers;
      this.loading = false;
    },
    (error: ErrorEvent) => {
      this.errorMsg = error.error.message;
      this.loading = false;
    });
  }


  deleteCustomer (id : string){
    this.adminService.deleteCustomer(id)
    .pipe(
      mergeMap(() => this.adminService.getAllCustomer())
    )
    .subscribe((customers: User[])=> {
      this.customers = customers;
      this.successMsg = 'Customer deleted sucssefully!'; 
    },
    (error: ErrorEvent) => {
      this.errorMsg = error.error.message;
    });
    
  }

  updateCustomer(name: string, email: string, appointment:[]){
    
    this.successMsg = '';
    this.errorMsg = '';
    this.adminService.updateCustomer(name,email, appointment)
    .subscribe((updateCustomer: User)=>{
      this.successMsg = 'Customer updated sucssefully!';
    },
    (error: ErrorEvent) => {
      this.errorMsg = error.error.message;
    });
    
  }

}
