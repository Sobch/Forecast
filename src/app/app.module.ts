import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { RoutingModule } from './modules/routing.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserComponent } from './components/user/user.component';
import { UsersService } from './services/users.service';
import { HttpService } from './services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from './services/weather.service';
import { AddUserComponent } from './components/add-user/add-user.component';
import { FormsModule } from '@angular/forms';
import { EditUserComponent } from './components/edit-user/edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    PageNotFoundComponent,
    UserComponent,
    AddUserComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    RoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpService, UsersService, WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
