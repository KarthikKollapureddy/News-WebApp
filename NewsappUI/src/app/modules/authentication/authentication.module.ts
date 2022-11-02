import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {SharedModule} from '../shared/shared.module'
import { RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms'
import {ReactiveFormsModule} from '@angular/forms';
import {AuthenticationService} from './authentication.service'
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';
import { TopNewsComponent } from '../news/components/top-news/top-news.component';
const authRouter: Routes = [
  {
    path:'',
    children: [
      {
        path: '',
        redirectTo: 'news/top',
        pathMatch: 'full'
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'news/top',
        component: TopNewsComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {path:'home',component:HomeComponent},
      {path:'changepassword',component:UpdatepasswordComponent},
    ]
  }
];
@NgModule({
  declarations: [LoginComponent, RegisterComponent, HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(authRouter),
    SharedModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
    
    
  ],
  providers:[AuthenticationService],
  exports: [
    RouterModule,
    RegisterComponent,
    LoginComponent,
    SharedModule
    
  ]
})
export class AuthenticationModule { }
