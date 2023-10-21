import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookPreviewComponent } from './book-preview.component';

describe('BookPreviewComponent', () => {
  let component: BookPreviewComponent;
  let fixture: ComponentFixture<BookPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookPreviewComponent],
    });
    fixture = TestBed.createComponent(BookPreviewComponent);
    component = fixture.componentInstance;
  });

  it('should create the BookPreviewComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the close event when closePreview is called', () => {
    let closeEmitted = false;
    component.close.subscribe(() => {
      closeEmitted = true;
    });

    component.closePreview();
    expect(closeEmitted).toBe(true);
  });

  it('should prevent event propagation on stopPropagation', () => {
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    const eventSpy = spyOn(event, 'stopPropagation');
    component.stopPropagation(event);
    expect(eventSpy).toHaveBeenCalled();
  });
});
