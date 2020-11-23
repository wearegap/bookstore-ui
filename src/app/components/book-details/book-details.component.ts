import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  currentBook = null;
  message = '';

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.message = '';
    this.getBook(this.route.snapshot.paramMap.get('id'));
  }

  getBook(id: any): void {
    this.bookService.get(id)
    .subscribe(
      data => {
        this.currentBook = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  updateReserved(status: any): void {
    const data = {
      title: this.currentBook.title,
      author: this.currentBook.author,
      reserved: status
    };

    this.bookService.update(this.currentBook.id, data)
    .subscribe(
      response => {
        this.currentBook.reserved = status;
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  updateBook(): void {
    this.bookService.update(this.currentBook.id, this.currentBook)
    .subscribe(
      response => {
        this.message = 'The book was updated successfully!';
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteBook(): void {
    this.bookService.delete(this.currentBook.id)
    .subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/books']);
      },
      error => {
        console.log(error);
      }
    );
  }

}
