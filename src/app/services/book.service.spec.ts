import { TestBed } from '@angular/core/testing';
import { BookService } from './book.service';

describe('BookService', () => {
  let service: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookService],
    });
    service = TestBed.inject(BookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an observable of books', (done) => {
    service.getBooks().subscribe((books) => {
      expect(books.length).toBeGreaterThan(0);
      done();
    });
  });

  it('should add a book', (done) => {
    const initialBookCount = service['books'].length;
    const newBook = {
      name: 'Test Book',
      price: 9.99,
      author: 'Test Author',
      date: '2023-10-22',
      genre: 'Test Genre',
      language: 'English',
      description: 'Test Description',
      pages: 100,
    };

    service.addBook(newBook);

    service.getBooks().subscribe((books) => {
      expect(books.length).toBe(initialBookCount + 1);
      done();
    });
  });

  it('should filter books based on filters', (done) => {
    const initialBookCount = service['books'].length;
    const newBook = {
      name: 'Test Book 1',
      price: 9.99,
      author: 'Гоголь',
      date: '2023-10-22',
      genre: 'Test Genre',
      language: 'English',
      description: 'Test Description',
      pages: 100,
    };

    const filters = {
      name: 'Test Book 1',
      authors: ['Гоголь'],
      languages: [],
      minPages: 0,
      maxPages: 250,
      genres: [],
      description: '',
    };

    service.addBook(newBook);
    service.getBooks().subscribe((books) => {
      expect(books.length).toBe(initialBookCount + 1);
      done();
    });

    const filteredBooks = service.filterBooks(filters);
    expect(filteredBooks.length).toBe(1);
  });

});
