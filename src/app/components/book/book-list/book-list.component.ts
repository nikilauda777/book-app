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
  genres: string[] = [];

  isPreviewOpen = false;
  selectedBook: any;
  addingAuthor: boolean = false; // for form visibillity
  newAuthor: string = '';

  //editing parameters
  editingAuthor = false;
  editingAuthors: boolean[] = new Array(this.authors.length).fill(false);
  editedAuthors: string[] = new Array(this.authors.length).fill('');

  //search parameters
  filterText: string = '';
  selectedAuthors: string[] = [];
  selectedLanguages: string[] = [];
  selectedGenres: string = '';
  minPages: number | null = null;
  maxPages: number | null = null;

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
    this.languageService.getGenres().subscribe((genres) => {
      this.genres = genres;
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
      genres: this.selectedGenres,
      description: this.filterText,
    });
  }

  //author logic
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

  editAuthor(index: number) {
    this.editingAuthors[index] = true;
    this.editedAuthors[index] = this.authors[index];
  }

  saveAuthorEdit(index: number) {
    if (this.editedAuthors[index].trim() !== '') {
      this.authorService.updateAuthor(this.authors[index], this.editedAuthors[index]);
    }
    this.editingAuthors[index] = false;
    this.editedAuthors[index] = ''; // Reset the textarea
  }

  cancelAuthorEdit(index: number) {
    this.editingAuthors[index] = false;
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
