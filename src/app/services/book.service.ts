import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Book} from "../model/book.model";

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private books: Book[] = [];
  private booksSubject = new BehaviorSubject<Book[]>([]);

  constructor() {
    this.addDummyBooks();
  }

  getBooks(): Observable<Book[]> {
    return this.booksSubject.asObservable();
  }

  addBook(book: Book): void {
    this.books.push(book);
    this.booksSubject.next([...this.books]);
  }

  //test value
  private addDummyBooks(): void {
    const dummyBooks: Book[] = [
      {
        name: 'Book 1',
        price: 19.99,
        author: 'Гоголь',
        date: '2023-10-20',
        genre: 'Roman',
        language: 'Russian',
        description: 'Классная Книга',
        pages: 222
      },
      {
        name: 'Book 2',
        price: 29.99,
        author: 'Гоголь',
        date: '2023-10-21',
        genre: 'Roman',
        language: 'Russian',
        description: 'Cупер Книга',
        pages: 223
      },
    ];
    dummyBooks.forEach((book) => {
      this.books.push(book);
    });
    this.booksSubject.next([...this.books]);
  }


  filterBooks(filters: any): Book[] {
    return this.books.filter((book) => {
      const nameMatch = book.name.toLowerCase().includes(filters.name.toLowerCase());
      const authorMatch = filters.authors.length === 0 || filters.authors.includes(book.author);
      const languageMatch = filters.languages.length === 0 || filters.languages.includes(book.language);
      const minPagesMatch = filters.minPages === null || book.pages >= filters.minPages;
      const maxPagesMatch = filters.maxPages === null || book.pages <= filters.maxPages;
      const genreMatch = filters.genres.length === 0 || filters.genres.includes(book.genre);
      const descriptionMatch = book.description.toLowerCase().includes(filters.description.toLowerCase());
      return (nameMatch || descriptionMatch) && authorMatch && languageMatch && minPagesMatch && maxPagesMatch && genreMatch;
    });
  }


}
