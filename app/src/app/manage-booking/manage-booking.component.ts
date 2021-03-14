import { Component, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { Appointment } from '../Appointment';
import {AdminService } from '../admin.service';

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.css']
})
export class ManageBookingComponent implements OnInit {

  public successMsg!: string;
  public errorMsg!: string;
  public loading = true;
  public appointments: Appointment[] = [];
  public columns = ['appointmentDate', 'name', 'email', 'cancel'];
  appointmentDate!: string;
  name!: string;
  email!: string;
  
  constructor(public adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getAppointments()
      .subscribe((appointments: Appointment[]) => {
        this.appointments = appointments;
        this.loading = false;
      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
        this.loading = false;
      });
  }

  cancelAppointment(id: string) {
    this.adminService.cancelAppointment(id)
      .pipe(
        mergeMap(() => this.adminService.getAppointments())
      )
      .subscribe((appointments: Appointment[]) => {
        this.appointments = appointments;
        this.successMsg = 'Successfully cancelled appointment';
      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
      });
  }

  editAppointment() {
    this.successMsg = '';
    this.errorMsg = '';
    this.adminService.updateAppointment(this.appointmentDate, this.name, this.email)
    .subscribe((editAppointments: Appointment) => {
          this.successMsg = 'Successfully updated appointment';
      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
      });
  }

  addNewBooking(){
    this.successMsg = '';
    this.errorMsg = '';
    this.adminService.adminCreateAppointment(this.appointmentDate,this.name, this.email)
    .subscribe((adminAddCustomer: Appointment)=>{
      this.successMsg = 'Booking added sucssefully!';
    },
    (error: ErrorEvent) => {
      this.errorMsg = error.error.message;
    });
    
  }

}

