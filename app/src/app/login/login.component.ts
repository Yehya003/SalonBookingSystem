import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from 'src/User';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public successMsg!:string;
  public errorMsg!: string;
  email!: string;
  password!: string;
  
  
  constructor(public adminService: AdminService, private router: Router) { }

  ngOnInit() {
  }

  openToggle() {
    this.router.navigate(['/booking']);
}

  signIn() {
   this.adminService.signIn(this.email, this.password).subscribe(res => {
      console.log(res);
      this.email ='';
      this.password ='';
      this.successMsg = 'You are logged in!';
    });
    
  }

}
