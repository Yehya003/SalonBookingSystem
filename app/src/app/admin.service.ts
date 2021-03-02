import {Injectable} from '@angular/core';
import{HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import {Customer} from './Customer';
import {Appointment} from './Appointment';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private BASE_URL = environment.BASE_URL;
    constructor(private http : HttpClient) {}

    // methods for customer

    addCustomer(name:string, email:string, contact:string):Observable<Customer> {
       return this.http.post<Customer>(`${this.BASE_URL}/customer`, {name, email, contact});
    }

     getAllCustomer():Observable<Customer[]> {
        return this.http.get<Customer[]>(`${this.BASE_URL}/customer`);
     }

     deleteCustomer(id:string):Observable<any> {
        return this.http.delete(`${this.BASE_URL}/customer/${id}`);
     }

     updateCustomer(name:string, email:string, contact:string):Observable<Customer> {
        return this.http.post<Customer>(`${this.BASE_URL}/customer`, {name, email, contact});
     }

     // methods for booking

     getAppointments(): Observable<Appointment[]> {
      return this.http.get<Appointment[]>(`${this.BASE_URL}/appointments`);
    }
  
    createAppointment(appointmentDate: string, name: string, email: string): Observable<Appointment> {
      return this.http.post<Appointment>(`${this.BASE_URL}/appointments`, { appointmentDate, name, email });
    }
  
    cancelAppointment(id: string): Observable<any> {
      return this.http.delete(`${this.BASE_URL}/appointments/${id}`);
    }
}