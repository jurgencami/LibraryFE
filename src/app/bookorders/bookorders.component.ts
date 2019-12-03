import { Component, OnInit } from '@angular/core';
import { BookOrderModel } from '../models/ordered_book';
import { AuthenticationService } from '../service/authentication.service';
import { BooksService } from '../service/books.service';
import { Router } from '@angular/router';
import { OrderModel } from '../models/order';

@Component({
  selector: 'app-bookorders',
  templateUrl: './bookorders.component.html',
  styleUrls: ['./bookorders.component.css']
})
export class BookordersComponent implements OnInit {
  books: BookOrderModel[];
  order: OrderModel = new OrderModel;

  constructor(private booksService: BooksService, private loginservice: AuthenticationService) { }

  ngOnInit() {
   this.getAllOrderedBooksData();
  }
  getAllOrderedBooksData() {
    this.booksService.getAllOrderedBooks().subscribe(result => {
      this.books = result;
    });
  }
  aproveBook(id: number): void {
      this.booksService.approveOrder(id)
      .subscribe( data => {
        this.getAllOrderedBooksData();
        alert("Book order approved.");
      });
  }
  rejectBook(id: number): void {
    this.booksService.rejectOrder(id)
    .subscribe( data => {
      this.getAllOrderedBooksData();
      alert("Book order approved.");
    });
}



}
