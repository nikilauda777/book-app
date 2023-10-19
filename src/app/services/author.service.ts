import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private authors: string[] = ['Толстой', 'Чехов', 'Гоголь', 'Пушкин', 'Тургенев'];
  private authorsSubject = new BehaviorSubject<string[]>(this.authors);

  getAuthors(): Observable<string[]> {
    return this.authorsSubject.asObservable();
  }
  addAuthor(newAuthor: string): void {
    this.authors.push(newAuthor);
    this.authorsSubject.next([...this.authors]);
  }
}
