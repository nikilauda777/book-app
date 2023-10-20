import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private languages: string[] = ['English', 'French', 'Russian', 'German', 'Spain'];
  private languagesSubject = new BehaviorSubject<string[]>(this.languages);

  getLanguages(): Observable<string[]> {
    return this.languagesSubject.asObservable();
  }
}
