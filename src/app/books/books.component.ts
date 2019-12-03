import { Component, OnInit } from '@angular/core';
import { BooksService } from '../service/books.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { BookDTOModel } from '../models/BookDTO';
import { BookModel } from '../models/book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  book: BookDTOModel = new BookDTOModel;
  books: BookDTOModel[];
  constructor(private booksService: BooksService, private loginservice: AuthenticationService) { }

  ngOnInit() {
    //this.book.user_id = +sessionStorage.getItem('userid')
    this.getAllBooksData();
  }

  getAllBooksData() {
    if(this.loginservice.isUserLoggedIn()){
      this.booksService.getUserBooks().subscribe(result => {
        this.books = result;
      });
    }else{
      this.booksService.getAllBooks().subscribe(result => {
        this.books = result;
      });
    }
  }
  saveBook(book : BookDTOModel): void {
    if(book.id > 0){
      this.booksService.updateBook(book)
      .subscribe( data => {
        this.book = new BookDTOModel;
        alert("Book updated successfully.");
        this.getAllBooksData();
      });
    }else{
      book.user_id = +sessionStorage.getItem('userid')
      this.booksService.saveBook(book)
      .subscribe( data => {
        this.book = new BookDTOModel;
        alert("Book created successfully.");
        this.getAllBooksData();
      });
    }
  }
  deleteBook(id: number): void {
    this.booksService.deleteBook(id)
    .subscribe( data => {
      alert("Book deleted successfully.");
      this.book = new BookDTOModel;
      this.getAllBooksData();
    });
  }
  selectBook(book: BookDTOModel): void {
    this.book = book
  }
}
