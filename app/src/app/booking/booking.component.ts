import { Component, OnInit } from '@angular/core';
import {AdminService } from '../admin.service';
import { User } from 'src/User';
import { Appointment } from '../Appointment';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  public successMsg!: string; 
  public errorMsg!: string;
   appointmentDate!: string; 
   name!: string;
   email!: string;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
  }

  createAppointment() {
    this.successMsg = '';
    this.errorMsg = '';
    this.adminService.createAppointment(this.appointmentDate, this.name, this.email)
      .subscribe((createdAppointment: User) => {
        this.appointmentDate = '';
        this.name = '';
        this.email = '';
        //const appointmentDate = new Date(createdAppointment.appointmentDate).toDateString();
        this.successMsg = `Appointment Booked Successfully for`;
      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
      });
  }


}
