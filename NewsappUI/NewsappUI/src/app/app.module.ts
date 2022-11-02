import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthenticationModule} from './modules/authentication/authentication.module'
import {MatIconModule} from '@angular/material/icon';
import {NewsModule} from './modules/news/news.module'
import {SharedModule} from './modules/shared/shared.module'
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import { UpdatepasswordComponent } from './modules/authentication/updatepassword/updatepassword.component';
// import { HomeComponent } from './modules/authentication/components/home/home.component';
import { AuthGuardService } from 'src/app/auth-guard.service';
import { AboutComponent } from './modules/about/about.component';
import { ContactusComponent } from './modules/contactus/contactus.component';


const appRoutes: Routes =[
  {
    path: '',
    redirectTo: '/news/top',
    pathMatch: 'full'
  },
  {
    path : 'updatepassword',
    canActivate : [AuthGuardService],
    component : UpdatepasswordComponent
  },
  {path:'aboutus',component:AboutComponent},
  {path:'contactus',component:ContactusComponent}
 
]
@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactusComponent,
    // HomeComponent
  ],
  imports: [
    BrowserModule,
    NewsModule,
    SharedModule,
    AuthenticationModule,
    RouterModule.forRoot(appRoutes),
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatGridListModule

    
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
