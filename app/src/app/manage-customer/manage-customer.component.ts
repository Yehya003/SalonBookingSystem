import { Component, OnInit } from '@angular/core';
import {AdminService } from '../admin.service';
import { mergeMap } from 'rxjs/operators';
import {Customer} from '../Customer';
import { stringify } from '@angular/compiler/src/util';
@Component({
  selector: 'app-manage-customer',
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.css']
})
export class ManageCustomerComponent implements OnInit {

  public successMsg : string='';
  public errorMsg: string = '';
  public loading = true;
  public customers: Customer[] = [];
  public columns = ['name','email','contact','delete','update'];
  
  constructor(public adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getAllCustomer()
    .subscribe((customers:Customer[]) => {
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
    .subscribe((customers: Customer[])=> {
      this.customers = customers;
      this.successMsg = 'Customer deleted sucssefully!'; 
    },
    (error: ErrorEvent) => {
      this.errorMsg = error.error.message;
    });
    
  }

  updateCustomer(name: string, email: string, contact: string){
    
    this.successMsg = '';
    this.errorMsg = '';
    this.adminService.updateCustomer(name,email,contact)
    .subscribe((updateCustomer: Customer)=>{
      this.successMsg = 'Customer updated sucssefully!';
    },
    (error: ErrorEvent) => {
      this.errorMsg = error.error.message;
    });
    
  }

}
