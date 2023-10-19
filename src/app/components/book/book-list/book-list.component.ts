import {Component, OnInit} from '@angular/core';
import {Book} from "../../../model/book.model";
import {BookService} from "../../../services/book.service";
import {Router} from "@angular/router";
import {AuthorService} from "../../../services/author.service";

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
  addingAuthor: boolean = false; // for form visibillity
  newAuthor: string = '';

  constructor(private bookService: BookService, private router: Router,
              private authorService: AuthorService) {
  }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((books) => {
      this.books = books;
    });
  }

  navigateToAddBook(): void {
    this.router.navigate(['/add-book']); // redirect to add book
  }

  //filter bookings
  filterBooks(): void {
    this.books = this.bookService.filterBooks(this.filterText);
  }

  //add author
  openAuthorInputForm() {
    this.addingAuthor = true;
  }

  addAuthor() {
    this.authorService.addAuthor(this.newAuthor);
    // Close the author input form
    this.closeAuthorInputForm();
  }

  closeAuthorInputForm() {
    this.addingAuthor = false;
    this.newAuthor = '';
  }

  //preview of book
  openBookPreview(book: any) {
    this.selectedBook = book;
    this.isPreviewOpen = true;
  }
  closeBookPreview() {
    this.isPreviewOpen = false;
  }
}
