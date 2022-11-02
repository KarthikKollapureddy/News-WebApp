import { Component, OnInit, ɵConsole } from '@angular/core';
import { User } from '../../user';
import {AuthenticationService} from '../../authentication.service'
import { Router } from '@angular/router';
import { FormGroup,Validators,  FormControl, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import {ErrorStateMatcher} from '@angular/material/core';



@Component({
  selector: 'user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  user: User;
  loginForm: FormGroup;
  constructor(private authService: AuthenticationService,
    private router: Router,private formBuilder: FormBuilder,private snackbar: MatSnackBar) { 
      // this.user=new User();
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      "userId":new FormControl('',[ Validators.required]),
      "password":new FormControl('',[ Validators.required]),
    
      })
    
  }
  loginUser(){
    if (this.loginForm.invalid) {
      return;
    };
    

    this.user = new User(this.loginForm.get('userId').value,this.loginForm.get('password').value,null, null);
    // this.user=new User();
    console.log("Login User data:", this.user);
    this.authService.loginUser(this.user).subscribe((data)=>{
     
      console.log(data);
      if(data['token']) {
        this.authService.setToken(data['token']);
        localStorage.setItem("userId",this.user.userId)
        this.router.navigate(['news/top']);
        // this.router.navigate(['./home']);
    
      

      }

    },error =>{
  
      this.snackbar.open(error.error, '', {
       duration : 2000
     });
    });

    
    
  }

}