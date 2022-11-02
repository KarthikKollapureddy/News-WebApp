import { Component,OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from './modules/authentication/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(){

    
  }
  title = 'Newsapp';
 

  constructor(public router: Router ,private auth: AuthenticationService,private snackBar : MatSnackBar)
  {
   
  }

  logout()
  {
    this.auth.deleteToken();
    this.router.navigate(['/login'])
    // this.router.navigate(['/new/top'])
    this.snackBar.open("You are sucesfully logged out","",{duration : 1000});
    

 
  }
  changepass()
  {
    this.router.navigate(['/updatepassword'])
 
  }
  aboutus(){
    this.router.navigate(['/aboutus'])
  }
  contactus(){
    this.router.navigate(['/contactus'])
  }
}
