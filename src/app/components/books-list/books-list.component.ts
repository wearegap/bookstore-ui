import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';


@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  books: any;
  currentBook = null;
  currentIndex = -1;
  title = '';

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.retrieveBooks();
  }

  retrieveBooks(): void {
    this.bookService.getAll()
    .subscribe(
      data => {
        this.books = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  refreshList(): void {
    this.retrieveBooks();
    this.currentBook = null;
    this.currentIndex = -1;
  }

  setActiveBook(book: any, index: any): void {
    this.currentBook = book;
    this.currentIndex = index;
  }

  searchTitle(): void {
    this.bookService.findByTitle(this.title)
    .subscribe(
      data => {
        this.books = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

}
