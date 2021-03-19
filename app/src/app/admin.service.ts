import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpResponse } from '@angular/common/http';
import { User } from 'src/User';
import { map } from 'rxjs/operators';
import { shareReplay } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
//import * as moment from 'moment';
import { Router } from '@angular/router';
import { Appointment } from './Appointment';

//  should be inside injectable
@Injectable({ providedIn: 'root' })
export class AdminService {
  private BASE_URL = environment.BASE_URL;
  tst: [] = [];
  constructor(private http: HttpClient, private _router: Router) {}

  //-------------- Methods for customer----------------

  addCustomer(
    name: string,
    email: string,
    password: string,
    isAdmin: boolean
  ): Observable<User> {
    return this.http.post<any>(`${this.BASE_URL}/api/auth/register`, {
      name,
      email,
      password,
      isAdmin,
    });
  }

  signIn(email: string, password: string) {
    return this.http.post<any>(`${this.BASE_URL}/api/auth/login`, {
      email,
      password,
    });
  }

  //-------------- --- Adminstrator -------------------
  getAllCustomer(): Observable<any[]> {
    return this.http.get<User[]>(`${this.BASE_URL}/api/users/`);
  }

  adminAddCustomer(
    name: string,
    email: string,
    password: string,
    isAdmin: boolean,
  ): Observable<User> {
    return this.http.post<User>(`${this.BASE_URL}/api/auth/register`, {
      name,
      email,
      password,
      isAdmin,
    });
  }

  deleteCustomer(userId: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/api/users/admin/${userId}/`);
  }

  updateCustomer(
    userId: string,
    name: string,
    email: string
    //appointment: []
  ): Observable<User> {
    return this.http.put<User>(`${this.BASE_URL}/api/users/${userId}/`, {
      name,
      email,
      //appointment,
    });
  }
  //--------------------------------------------------------------------------
  // methods for booking

  createAppointment(
    appointmentDate: string,
    name: string,
    email: string
  ): Observable<User> {
    return this.http.post<any>(`${this.BASE_URL}/api/appointment/`, {
      appointmentDate,
      name,
      email,
    });
  }
  //----------------------------------------------------------------------------
  // ADMIN
  getAppointments(): Observable<any[]> {
    return this.http.get<User[]>(`${this.BASE_URL}/api/appointment/admin/all`);    
  }
    

  // pass appointmenDate, name & email
  adminCreateAppointment(
    appointmentDate: string,
    name: string,
    email: string
  ): Observable<User> {
    return this.http.post<any>(`${this.BASE_URL}/api/appointment/admin`, {
      appointmentDate,
      name,
      email,
    });
  }

  //pass appointmentId & userId in the body
  cancelAppointment(id: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/api/appointment/admin/${id}`);
  }

  // userId, appointmentId, appointmentDate in the body
  updateAppointment(
    userId: string,
    appointmentId: string,
    appointmentDate: string,
  ): Observable<User> {
    return this.http.patch<User>(
      `${this.BASE_URL}/api/appointment/admin${userId}`,
      {
        appointmentId,
        appointmentDate,
      }
    );
  }
}
