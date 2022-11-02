import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication.service';
import { User } from '../user';
import { MatSnackBar } from '@angular/material';
import { FormGroup,Validators,  FormControl,FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.css']
})
export class UpdatepasswordComponent implements OnInit {
  updateForm:FormGroup 
  user:User
  disp_msg: string;
  userId:string;
  constructor(private formBuilder: FormBuilder,private AuthenticationService: AuthenticationService, private router: Router, private snackbar:MatSnackBar) {
    // this.user = new User(this.user.userId,null,null,null);
    this.user = new User(null,null,null,null);
    

   }

  ngOnInit() {
    // this.updateForm = this.formBuilder.group({
    //   "oldpassword":new FormControl('',[ Validators.required]),
    //  "newpassword":new FormControl('',[ Validators.required])
    // })
    }
  updatePassword(){
  //  console.log(this.user.userId)
    console.log(localStorage.getItem('userId')+" inupdate")
    // this.snackbar.open("Congratulations! your password updated successfully","", {
    //   duration : 3000
    // });
    // this.router.navigate(["/login"])
    this.AuthenticationService.updatePassword(this.user,localStorage.getItem('userId')).subscribe({
      next:(data)=>{this.disp_msg="Congratulations "+this.user.userId+" your password updated successfully";this.router.navigate(["/login"])},
      error:(e)=>{console.log(e);this.disp_msg="Failed to update your pasword"
      ;
      }
    })
    this.AuthenticationService.deleteToken();
    this.router.navigate(['/login'])
    // this.router.navigate(['/new/top'])
    this.snackbar.open("You are sucesfully logged out","",{duration : 1000});
  }
}
