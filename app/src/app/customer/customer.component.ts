import { Component, OnInit } from '@angular/core';
import {AdminService } from '../admin.service';
import { mergeMap } from 'rxjs/operators';
import {Customer} from '../Customer';

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
  contact!: string;
  
  constructor(public adminService: AdminService) { }

  ngOnInit() {
  }
  
  addCustomer() {
    this.successMsg = "";
    this.errorMsg = "";
    this.adminService.addCustomer(this.name, this.email, this.contact)
    .subscribe((addCustomer: Customer) => {
      this.name = '';
      this.email ='';
      this.contact ='';
      this.successMsg = 'Customer Added!';
    },
    (error: ErrorEvent) => {
      this.errorMsg = error.error.message;
    });
    
  }


}
