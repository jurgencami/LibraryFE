import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { BookDTOModel } from '../models/BookDTO';
import { BookOrderModel } from '../models/ordered_book';
import { OrderModel } from '../models/order';
import { BookModel } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient, private auth: AuthenticationService) { }

  getAllBooks() {
    return this.http.get<BookDTOModel[]>(`http://localhost:8080/books`, { headers: this.auth.httpHeaders().headers });
  }

  getUserBooks() {
    return this.http.get<BookDTOModel[]>(`http://localhost:8080/books/`+ sessionStorage.getItem('userid'), { headers: this.auth.httpHeaders().headers });
  }

  getAllOrderedBooks() {
    return this.http.get<BookOrderModel[]>(`http://localhost:8080/orders`, { headers: this.auth.httpHeaders().headers });
  }

  getBooksByOthers() {
    return this.http.get<BookDTOModel[]>(`http://localhost:8080/order-book-list/`+ sessionStorage.getItem('userid'), { headers: this.auth.httpHeaders().headers });
  }

  saveBook(book: BookModel) {
    return this.http.post<BookModel>("http://localhost:8080/add-book", book, { 
        headers: this.auth.httpHeaders().headers });
  }
  updateBook(book: BookModel) {
    return this.http.post<BookModel>("http://localhost:8080/update-book", book, { 
        headers: this.auth.httpHeaders().headers });
  }

  orderBook(order: OrderModel) {
    return this.http.post<OrderModel>("http://localhost:8080/add-order", order, { 
        headers: this.auth.httpHeaders().headers });
  }

  deleteBook(id: string | number) {
    return this.http.get<BookDTOModel[]>(`http://localhost:8080/delete-book/`+id, { headers: this.auth.httpHeaders().headers});
  }

  approveOrder(id: number) {
    return this.http.get<OrderModel[]>("http://localhost:8080/approve-order/"+id, { 
        headers: this.auth.httpHeaders().headers });
  }
  rejectOrder(id: number) {
    return this.http.get<OrderModel[]>("http://localhost:8080/reject-order/"+id, { 
        headers: this.auth.httpHeaders().headers });
  }

}
