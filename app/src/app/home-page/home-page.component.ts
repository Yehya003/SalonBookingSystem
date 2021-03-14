import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from 'src/User';
import { AdminService } from '../admin.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  public successMsg!: string;
  public errorMsg!: string;
  email!: string;
  password!: string;

  constructor(public adminService: AdminService) {}

  ngOnInit() {}

  signIn() {
    this.adminService.signIn(this.email, this.password).subscribe(
      res => {
        localStorage.setItem('token', res.token)
      },
      err => console.log(err)
    ) 
    this.email = '';
    this.password = '';
    this.successMsg = 'You are logged in!';
  }
  

  /*
    
    loginUser () {
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token)
        this._router.navigate(['/special'])
      },
      err => console.log(err)
    ) 
    }
    */
}
