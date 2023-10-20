import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private languages: string[] = ['English', 'French', 'Russian', 'German', 'Spain'];
  private languagesSubject = new BehaviorSubject<string[]>(this.languages);

  private genres: string[] = ['Roman', 'Fantastic'];
  private genresSubject = new BehaviorSubject<string[]>(this.genres);


  getLanguages(): Observable<string[]> {
    return this.languagesSubject.asObservable();
  }

  getGenres(): Observable<string[]> {
    return this.genresSubject.asObservable();
  }

  addGenres(newGenre: string): void {
    // Check if the new genre is not already in the list
    if (!this.genres.includes(newGenre)) {
      this.genres.push(newGenre);
      this.genresSubject.next([...this.genres]);
    }
  }

}
