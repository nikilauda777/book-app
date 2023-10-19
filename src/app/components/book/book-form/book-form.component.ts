import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BookService} from "../../../services/book.service";

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent {
  bookForm: FormGroup;

  constructor(private fb: FormBuilder, private bookService: BookService) {
    this.bookForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      author: ['', Validators.required],
      date: ['', Validators.required],
      genre: ['', Validators.required],
      language: ['', Validators.required],
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
