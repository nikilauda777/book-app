import {Component, OnInit} from '@angular/core';
import {Book} from "../../../model/book.model";
import {BookService} from "../../../services/book.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  isPreviewOpen = false;
  selectedBook: any;
  filterText: string = '';

  constructor(private bookService: BookService, private router: Router) {
  }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((books) => {
      this.books = books;
    });
  }

  navigateToAddBook(): void {
    this.router.navigate(['/add-book']); // redirect to add book
  }

  filterBooks(): void {
    this.books = this.bookService.filterBooks(this.filterText);
  }

  openBookPreview(book: any) {
    this.selectedBook = book;
    this.isPreviewOpen = true;
  }

  closeBookPreview() {
    this.isPreviewOpen = false;
  }
}
