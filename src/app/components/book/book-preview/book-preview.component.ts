import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-book-preview',
  templateUrl: './book-preview.component.html',
  styleUrls: ['./book-preview.component.css']
})
export class BookPreviewComponent {
  @Input() book: any;
  @Output() close = new EventEmitter<void>();

  closePreview() {
    this.close.emit();
  }

  stopPropagation(event: Event) {
    // Prevent clicks within the modal from propagating to the overlay
    event.stopPropagation();
  }

}
