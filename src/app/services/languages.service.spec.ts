import {TestBed} from '@angular/core/testing';
import {LanguageService} from './language.service';

describe('LanguageService', () => {
  let service: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LanguageService],
    });
    service = TestBed.inject(LanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to add a new genre', () => {
    const newGenre = 'Mystery';
    service.addGenres(newGenre);
    service.getGenres().subscribe((updatedGenres) => {
      expect(updatedGenres).toContain(newGenre);
    });
  });

  it('should not add a duplicate genre and the length should remain the same', () => {
    const existingGenre = 'Roman';
    service.getGenres().subscribe((initialGenres) => {
      const initialLength = initialGenres.length;
      service.addGenres(existingGenre);
      service.getGenres().subscribe((updatedGenres) => {
        expect(updatedGenres).toEqual(initialGenres);
        expect(updatedGenres.length).toBe(initialLength);
      });
    });
  });
});
