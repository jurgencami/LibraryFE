import { Component, OnInit } from '@angular/core';
import { BookModel } from '../models/book';
import { BooksService } from '../service/books.service';
import { AuthenticationService } from '../service/authentication.service';
import { OrderModel } from '../models/order';


@Component({
  selector: 'app-order-book',
  templateUrl: './order-book.component.html',
  styleUrls: ['./order-book.component.css']
})
export class OrderBookComponent implements OnInit {
  order: OrderModel = new OrderModel;
  book: BookModel = new BookModel;
  books: BookModel[];
  constructor(private booksService: BooksService, private loginservice: AuthenticationService) { }

  ngOnInit() {
    this.getAllBooksData();
  }
  getAllBooksData() {
      this.booksService.getBooksByOthers().subscribe(result => {
        this.books = result;
      });
  }
  selectBook(book: BookModel): void {
    this.book = book;
  }
  orderBook(book: BookModel): void {
    
    this.order.user_id = +sessionStorage.getItem('userid');
    this.order.book_id = book.id;
    this.order.approved = 0;
    this.booksService.orderBook(this.order)
      .subscribe( data => {
        this.order = new OrderModel;
        this.book = new BookModel;
        alert("Book ordered successfully.");
        this.getAllBooksData();
      }, (error) => {
          alert(error.error.message)
      });

  }
}
