import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { BasicAuthHtppInterceptorService } from './service/basic-auth-htpp-interceptor.service';
import { HeaderComponent } from './header/header.component';
import { LogoutComponent } from './logout/logout.component';
import { BooksComponent } from './books/books.component';
import { RouterModule } from '@angular/router';
import { BookordersComponent } from './bookorders/bookorders.component';
import { AddUserComponent } from './add-user/add-user.component';
import { OrderBookComponent } from './order-book/order-book.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarModule} from 'primeng/menubar';
import { ToolbarModule, Toolbar } from 'primeng/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    LogoutComponent,
    BooksComponent,
    BookordersComponent,
    AddUserComponent,
    OrderBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ButtonModule,
    CalendarModule,
    BrowserAnimationsModule,
    MenubarModule,
    ToolbarModule,
    ReactiveFormsModule
  ],
  providers: [  
    {  
    provide:HTTP_INTERCEPTORS, useClass:BasicAuthHtppInterceptorService, multi:true 
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
