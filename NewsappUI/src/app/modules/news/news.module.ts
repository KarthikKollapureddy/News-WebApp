import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterceptorService } from './interceptor.service';
import { SearchComponent } from './components/search/search.component';
import { ContainerComponent } from './components/container/container.component';
import { ThumnailComponent } from './components/thumnail/thumnail.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FavComponent } from './components/fav/fav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewsService} from './news.service'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthGuardService } from 'src/app/auth-guard.service';
import { TopNewsComponent } from './components/top-news/top-news.component';
import { UpdatepasswordComponent } from '../authentication/updatepassword/updatepassword.component';

const newsRoutes: Routes = [
  {
      path : 'news',
      children : [
     
          {
              path : 'search',
              // canActivate : [AuthGuardService],
              component : SearchComponent
          },
          {
            path : 'favourites',
            canActivate : [AuthGuardService],
            component : FavComponent
          },
          {
            path : 'top',
            // canActivate : [AuthGuardService],
            component : TopNewsComponent
        },
          {
            path : 'updatepassword',
            canActivate : [AuthGuardService],
            component : UpdatepasswordComponent
        },
      ]
  }
];
@NgModule({
  declarations: [SearchComponent, ContainerComponent, ThumnailComponent, FavComponent, TopNewsComponent,UpdatepasswordComponent],
  imports: [
    RouterModule.forChild(newsRoutes),
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers:[
    NewsService, {
      provide : HTTP_INTERCEPTORS,
      useClass :  InterceptorService,
      multi : true
    }
  ],
  exports :[
    SearchComponent, ContainerComponent, ThumnailComponent,TopNewsComponent,UpdatepasswordComponent
  ]
})
export class NewsModule { }
