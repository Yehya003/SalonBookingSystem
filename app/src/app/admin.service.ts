import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpResponse } from '@angular/common/http';
import { Appointment } from './Appointment';
import { User } from 'src/User';
import { map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private BASE_URL = environment.BASE_URL;
  constructor(private http: HttpClient) {}

  //-------------- Methods for customer----------------

  addCustomer(
    name: string,
    email: string,
    password: string,
    isAdmin: boolean
  ): Observable<User> {
    return this.http.post<User>(`${this.BASE_URL}/api/auth/register`, {
      name,
      email,
      password,
      isAdmin,
    });
  }

  /*signIn(email: string, password: string) {
    this.http
      .post<User>(
        `${this.BASE_URL}/api/auth/login`,
        { email, password },
        { observe: 'response' }
      )
      .subscribe((response) => {
        const keys = response.headers.keys();
        const headers = keys.map(
          (key) => `${key}: ${response.headers.get(key)}`
        );

        console.log(headers);
      });
  }*/

  signIn(email: string, password: string) {
    const headers = new HttpHeaders({
       //'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
       //'Access-Control-Allow-Origin': '*',
       'Content-Type': 'application/json;charset=ISO-8859-1'
    });

    const options = {
      headers: headers,
    };
    return this.http
      .post(`${this.BASE_URL}/api/auth/login`, { email, password }, options)
      .pipe(
        map (res => {
          return{ status: res, data: res};
        })
      );
  }
  /*
  signIn(email: string, password: string) {
    const headers = new HttpHeaders({
      // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      // 'Access-Control-Allow-Origin': '*'
      'Content-Type': 'application/json;charset=ISO-8859-1',
    });

    const options = {
      headers: headers,
    };
    this.http
      .post(`${this.BASE_URL}/api/auth/login`, { email, password }, options)
      .subscribe((data) => {
        console.log(data + "heyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
      });
   
    // For pass blob in API

    return this.http
      .get(`${this.BASE_URL}/api/auth/login`, {
        headers: new HttpHeaders({
          token: '{data}',
          'Content-Type': 'application/json',
        }),
        responseType: 'blob',
      })
      .pipe(
        tap(
          // Log the result or error
          (data) => console.log('You received data' + data),
          (error) => console.log(error)
        )
      );
  }
*/

  //-------------- --- Adminstrator -------------------
  getAllCustomer(): Observable<User[]> {
    return this.http.get<User[]>(`${this.BASE_URL}/api/users/`);
  }

  adminAddCustomer(
    name: string,
    email: string,
    password: string,
    isAdmin: boolean
  ): Observable<User> {
    return this.http.post<User>(`${this.BASE_URL}/api/auth/register`, {
      name,
      email,
      password,
      isAdmin,
    });
  }

  deleteCustomer(id: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/api/users/admin/${id}/`);
  }

  updateCustomer(
    name: string,
    email: string,
    password: string,
    isAdmin: boolean
    //appointment: []
  ): Observable<User> {
    return this.http.post<User>(`${this.BASE_URL}/api/users`, {
      name,
      email,
      password,
      isAdmin
      //appointment,
    });
  }

  // methods for booking

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.BASE_URL}/appointments`);
  }

  createAppointment(
    appointmentDate: string,
    name: string,
    email: string
  ): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.BASE_URL}/appointments`, {
      appointmentDate,
      name,
      email,
    });
  }

  adminCreateAppointment(
    appointmentDate: string,
    name: string,
    email: string
  ): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.BASE_URL}/appointments`, {
      appointmentDate,
      name,
      email,
    });
  }

  cancelAppointment(id: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/appointments/${id}`);
  }

  updateAppointment(
    appointmentDate: string,
    name: string,
    email: string
  ): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.BASE_URL}/appointments`, {
      appointmentDate,
      name,
      email,
    });
  }
}
