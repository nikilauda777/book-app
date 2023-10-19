import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {Book} from "../model/book.model";

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private books: Book[] = [];
  private booksSubject = new BehaviorSubject<Book[]>([]);

  getBooks(): Observable<Book[]> {
    return this.booksSubject.asObservable();
  }

  addBook(book: Book): void {
    this.books.push(book);
    this.booksSubject.next([...this.books]);
  }
}
