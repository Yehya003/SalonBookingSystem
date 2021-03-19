import { Component, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { AdminService } from '../admin.service';
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
  public appointments: User[] = [];
  public theAppointments: string[] = [];
  public rows: User[] = [];
  public columns = [
    'UserId',
    'appointmentId',
    'appointmentDate',
    'name',
    'email',
    'cancel',
    'update',
  ];

  foo: string[] = [];
  userId!: string;
  appointmentDate!: string;
  appointmentId!: number;
  name!: string;
  email!: string;
  stringifiedData: any;
  parsedJson: any;
  constructor(public adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getAppointments().subscribe(
      (appointments: User[]) => {
        this.appointments = appointments;

        /*let rows = [];
        for (const key in appointments) {
          if (appointments.hasOwnProperty(key)) {
            rows.push(appointments[key]);
          }
        }

        this.rows = rows;
        console.log(this.rows[3]);
        console.log(this.rows[3].appointment[0]._id);
        console.log(this.rows[3].appointment[0].appointmentDate);
        console.log(this.rows[3].appointment[0].email);
        console.log(this.rows[3].appointment[0].name);
        */

        //console.log(appointments);
        // Convert to JSON
        //this.stringifiedData = JSON.stringify(appointments);

        /*console.log('With Stringify=', this.stringifiedData);
           let myObj = '{"data":' + this.stringifiedData + '}';
           this.parsedJson = JSON.parse(myObj)*/
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
        /* console.log('With Parsed JSON :', this.parsedJson);
           
           for(var i=0;i<appointments.length;i++){
             this.parsedJson = JSON.parse(myObj).data[i].appointment;
           console.log("HERE WE ARE "+i+ this.parsedJson);
           }*/

        /*var x;
          x = JSON.stringify(appointments);
          x = "[" + x.replace(/[\[\]]/g, "") + "]";
          return JSON.parse(x);
  */

        //this.appointments = appointments;

        // var  data = this.appointments.indexOf(1);
        //console.log(this.appointments);

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
        (appointments: User[]) => {
          this.appointments = appointments;
          this.successMsg = 'Successfully cancelled appointment';
        },
        (error: ErrorEvent) => {
          this.errorMsg = error.error.message;
        }
      );
  }

  editAppointment(userId: string) {
    console.log(
      'THE VALUE OF EDIT METHOD' + this.userId,
      this.appointmentId,
      this.appointmentDate
    );
    this.successMsg = '';
    this.errorMsg = '';
    this.adminService
      .updateAppointment(userId, this.appointmentId, this.appointmentDate)
      .subscribe(
        (editAppointments: User) => {
          this.successMsg = 'Successfully updated appointment';
          this.userId = '';
          this.appointmentId = 0;
          this.appointmentDate = '';
        },
        (error: ErrorEvent) => {
          this.errorMsg = error.error.message;
        }
      );
  }

  fillUpdateFields(userId: string, appointmentId: string, appointmentDate: string, name: string, email: string) {
    let foo: string[] = [userId, appointmentId, appointmentDate, name, email];
    this.foo = foo;
    foo = [];
  }

  getFoo() {
    return this.foo;
  }

  addNewBooking(userId: string) {
    console.log(
      'THE VALUE OF ADD METHOD' + this.userId,
      this.appointmentId,
      this.appointmentDate,
      this.name,
      this.email
    );

    this.successMsg = '';
    this.errorMsg = '';
    this.adminService
      .adminCreateAppointment(
        userId,
        this.appointmentId,
        this.appointmentDate,
        this.name,
        this.email
      )
      .subscribe(
        (adminAddCustomer: User) => {
          this.successMsg = 'Booking added sucssefully!';
          this.userId = '';
          this.appointmentId = 0;
          this.appointmentDate = '';
          this.name = '';
          this.email = '';
        },
        (error: ErrorEvent) => {
          this.errorMsg = error.error.message;
        }
      );
  }
}
