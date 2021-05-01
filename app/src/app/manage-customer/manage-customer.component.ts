import { Component, OnInit } from '@angular/core';
import {AdminService } from '../admin.service';
import { mergeMap } from 'rxjs/operators';

import { stringify } from '@angular/compiler/src/util';
import { User } from 'src/User';

@Component({
  selector: 'app-manage-customer',
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.css'],
})
export class ManageCustomerComponent implements OnInit {
  public successMsg!: string;
  public errorMsg!: string;
  public loading = true;
  public customers: User[] = [];
  public columns = ['id', 'name', 'email', 'appointment', 'delete', 'update'];
  isAdmin!: boolean;
  name!: string;
  email!: string;
  password!: string;
  userId!: string;
  foo: string[] = [];
  appointmentId: number = 0;
  appointmentDate: string = '';

  constructor(public adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getAllCustomer().subscribe(
      (customers: User[]) => {
        this.customers = customers;
        this.loading = false;
        console.log(this.customers);
      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
        this.loading = false;
      }
    );
  }

  deleteCustomer(id: string) {
    this.adminService
      .deleteCustomer(id)
      .pipe(mergeMap(() => this.adminService.getAllCustomer()))
      .subscribe(
        (customers: User[]) => {
          this.customers = customers;
          this.successMsg = 'Customer deleted sucssefully!';
        },
        (error: ErrorEvent) => {
          this.errorMsg = error.error.message;
        }
      );
  }

  updateCustomer(userId: string) {
    console.log(this.name, this.email, userId);
    this.successMsg = '';
    this.errorMsg = '';
    this.adminService.updateCustomer(userId, this.name, this.email).subscribe(
      (updateCustomerInfo: User) => {
        //this.name='';
        //this.email='';
        //this.userId='';
        this.successMsg = 'Customer updated sucssefully!';
      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
      }
    );
  }

  fillUpdateFields(userId: string, name: string, email: string) {
    let foo: string[] = [userId, name, email];
    this.foo = foo;
    foo = [];
  }

  getFoo() {
    return this.foo;
  }

  addNewCustomer() {
    this.successMsg = '';
    this.errorMsg = '';
    this.adminService
      .adminAddCustomer(this.name, this.email, this.password, this.isAdmin, this.appointmentId, this.appointmentDate)
      .subscribe(
        (adminAddCustomer: User) => {
          this.name = '';
          this.email ='';
          this.password ='';
          this.successMsg = 'Customer added sucssefully!';
        },
        (error: ErrorEvent) => {
          this.errorMsg = error.error.message;
        }
      );
  }
}
