import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BookService} from "../../../services/book.service";
import {LanguageService} from "../../../services/language.service";
import {AuthorService} from "../../../services/author.service";

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent {
  bookForm: FormGroup;
  authors: string[] = [];
  languages: string[] = [];

  constructor(private fb: FormBuilder, private bookService: BookService,
              private authorService: AuthorService,
              private languageService: LanguageService) {

    this.bookForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      pages: [0, [Validators.required, Validators.min(0)]],
      author: ['', Validators.required],
      date: ['', Validators.required],
      genre: ['', Validators.required],
      language: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.authorService.getAuthors().subscribe((authors) => {
      this.authors = authors;
    });

    this.languageService.getLanguages().subscribe((languages) => {
      this.languages = languages;
    });
  }


  onSubmit(): void {
    if (this.bookForm.valid) {
      const newBook = this.bookForm.value;
      this.bookService.addBook(newBook);
      this.bookForm.reset();
    }
  }
}
