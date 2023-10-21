import {AuthorService} from './author.service';
import {TestBed} from "@angular/core/testing";


describe('AuthorService', () => {
  let service: AuthorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthorService],
    });
    service = TestBed.inject(AuthorService);
  });

  it('should update an existing author', () => {
    const oldAuthor = 'Толстой';
    const newAuthor = 'New Author';

    service.updateAuthor(oldAuthor, newAuthor);

    service.getAuthors().subscribe((authors) => {
      expect(authors).toContain(newAuthor);
      expect(authors).not.toContain(oldAuthor);
    });
  });

  it('should not update an author if the old author does not exist', () => {
    const oldAuthor = 'Nonexistent Author';
    const newAuthor = 'New Author';

    service.updateAuthor(oldAuthor, newAuthor);
    service.getAuthors().subscribe((authors) => {
      expect(authors).not.toContain(newAuthor);
      expect(authors).not.toContain(oldAuthor);
    });
  });

  it('should add a new author', () => {
    const newAuthor = 'New Author';
    service.addAuthor(newAuthor);
    service.getAuthors().subscribe((authors) => {
      expect(authors).toContain(newAuthor);
    });
  });
});
