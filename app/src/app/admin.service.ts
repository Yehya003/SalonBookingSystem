import {Injectable} from '@angular/core';
import{HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import {Appointment} from './Appointment';
import { User } from 'src/User';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private BASE_URL = environment.BASE_URL;
    constructor(private http : HttpClient) {}

    //-------------- Methods for customer----------------

    addCustomer(name:string, email:string, password:string, isAdmin:boolean):Observable<User> {
       return this.http.post<User>(`${this.BASE_URL}/api/auth/register`, {name, email, password, isAdmin});
    }
    
     signIn(email:string, password:string):Observable<User> {
         return this.http.post<User>(`${this.BASE_URL}/api/auth/login`, { email, password},
      {observe: 'response' as 'body'})
      .pipe(map(user => {
        console.log(user);
       return user;
  }));
        
     }

     //-------------- --- Adminstrator -------------------
     getAllCustomer():Observable<User[]> {
        return this.http.get<User[]>(`${this.BASE_URL}/api/users/`);
     }

     deleteCustomer(id:string):Observable<any> {
        return this.http.delete(`${this.BASE_URL}/api/users/admin/${id}/`);
     }

     updateCustomer(name:string, email:string, appointment:[]):Observable<User> {
        return this.http.post<User>(`${this.BASE_URL}/api/users`, {name, email, appointment});
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

    updateAppointment(appointmentDate:string, name:string, email:string):Observable<Appointment> {
        return this.http.post<Appointment>(`${this.BASE_URL}/appointments`, {appointmentDate,name, email});
    }
}