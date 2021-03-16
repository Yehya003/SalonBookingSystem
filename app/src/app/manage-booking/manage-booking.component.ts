import { Component, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import {AdminService } from '../admin.service';
import { User } from 'src/User';
import { Appointment } from '../Appointment';

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.css'],
})
export class ManageBookingComponent implements OnInit {
  public successMsg!: string;
  public errorMsg!: string;
  public loading = true;
  public appointments: Appointment[] = [];
  public theAppointments: string[] = [];

  // public appointments: Appointment[] = [];
  public columns = ['userId', 'appointment', 'cancel', 'update'];

  /* 'appointmentDate',
    'name',
    'email',*/

  foo: string[] = [];
  appointmentDate!: string;
  appointmentId!: string;
  name!: string;
  email!: string;
  stringifiedData: any;
  parsedJson: any;
  constructor(public adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getAppointments().subscribe(
      (appointments: Appointment[]) => {
        this.appointments = appointments;
        //console.log(appointments);
        // Convert to JSON
        this.stringifiedData = JSON.stringify(appointments);

       console.log('With Stringify=', this.stringifiedData);
        let myObj = '{"data":' + this.stringifiedData + '}';
        this.parsedJson = JSON.parse(myObj)
        /*
        let theData = JSON.stringify(this.parsedJson);
        theData = theData.replace(/[\{}"[\]]/g, '') ;
                console.log('after fixing :', theData);

        var res = theData.split(":"+ ",");
        let appointmentDate = res[4];
        let id = res[2];
                console.log(
                  'AppointmentDate ==> ' + appointmentDate + 'theId ==> ' + id
                );
*/
/*
var i, j, x = "";
for (i in this.parsedJson.data) {
  x += "<h2>" + this.parsedJson.data[i].name + "</h2>";
  for (j in this.parsedJson.data[i].models) {
    x += this.parsedJson.data[i].[j] + "<br>";
  }
*/

       // this.parsedJson = JSON.parse(myObj);
        console.log('With Parsed JSON :', this.parsedJson);
        
        for(var i=0;i<appointments.length;i++){
          this.parsedJson = JSON.parse(myObj).data[i].appointment;
        console.log("HERE WE ARE "+i+ this.parsedJson);
        }
       

        /*var x;
        x = JSON.stringify(appointments);
        x = "[" + x.replace(/[\[\]]/g, "") + "]";
        return JSON.parse(x);
*/
        this.loading = false;
      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
        this.loading = false;
      }
    );
  }

  cancelAppointment(userId: string) {
    this.adminService
      .cancelAppointment(userId)
      .pipe(mergeMap(() => this.adminService.getAppointments()))
      .subscribe(
        (appointments: Appointment[]) => {
          this.appointments = appointments;
          this.successMsg = 'Successfully cancelled appointment';
        },
        (error: ErrorEvent) => {
          this.errorMsg = error.error.message;
        }
      );
  }

  editAppointment(
    userId: string,
    appointmentId: string,
    appointmentDate: string
  ) {
    this.successMsg = '';
    this.errorMsg = '';
    this.adminService
      .updateAppointment(userId, appointmentId, appointmentDate)
      .subscribe(
        (editAppointments: User) => {
          this.successMsg = 'Successfully updated appointment';
        },
        (error: ErrorEvent) => {
          this.errorMsg = error.error.message;
        }
      );
  }

  fillUpdateFields(
    userId: string,
    appointmentId: string,
    appointmentDate: string
  ) {
    let foo: string[] = [userId, appointmentId, appointmentDate];
    this.foo = foo;
    foo = [];
  }

  getFoo() {
    return this.foo;
  }

  addNewBooking() {
    this.successMsg = '';
    this.errorMsg = '';
    this.adminService
      .adminCreateAppointment(this.appointmentDate, this.name, this.email)
      .subscribe(
        (adminAddCustomer: User) => {
          this.successMsg = 'Booking added sucssefully!';
        },
        (error: ErrorEvent) => {
          this.errorMsg = error.error.message;
        }
      );
  }
}

