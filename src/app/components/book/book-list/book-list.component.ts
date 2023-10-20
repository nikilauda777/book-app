import {Component, OnInit} from '@angular/core';
import {Book} from "../../../model/book.model";
import {BookService} from "../../../services/book.service";
import {Router} from "@angular/router";
import {AuthorService} from "../../../services/author.service";
import {LanguageService} from "../../../services/language.service";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  authors: string[] = [];
  languages: string[] = [];

  isPreviewOpen = false;
  selectedBook: any;
  addingAuthor: boolean = false; // for form visibillity
  newAuthor: string = '';
  //search parameters
  filterText: string = '';
  selectedAuthors: string[] = [];
  selectedLanguages: string[] = [];

  minPages: number | null = null;
  maxPages: number | null = null;
  selectedGenre: string = '';

  constructor(private bookService: BookService,
              private router: Router,
              private authorService: AuthorService,
              private languageService: LanguageService) {
  }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((books) => {
      this.books = books;
    });
    this.authorService.getAuthors().subscribe((authors) => {
      this.authors = authors;
    });
    this.languageService.getLanguages().subscribe((languages) => {
      this.languages = languages;
    });
  }

  navigateToAddBook(): void {
    this.router.navigate(['/add-book']); // redirect to add book
  }

  //filter books
  filterBooks(): void {
    this.books = this.bookService.filterBooks({
      name: this.filterText,
      authors: this.selectedAuthors,
      languages: this.selectedLanguages,
      minPages: this.minPages,
      maxPages: this.maxPages,
    });
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
