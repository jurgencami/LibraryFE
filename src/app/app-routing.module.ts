import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGaurdService } from './service/auth-guard.service';
import { BooksComponent } from './books/books.component';
import { BookordersComponent } from './bookorders/bookorders.component';
import { AddUserComponent } from './add-user/add-user.component';
import { OrderBookComponent } from './order-book/order-book.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate:[AuthGaurdService] },
  { path: 'books', component: BooksComponent },
  { path: 'bookorders', component: BookordersComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'order-book', component: OrderBookComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
