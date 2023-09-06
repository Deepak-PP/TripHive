import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appNoLeadingSpace]',
})
export class appNoLeadingSpace {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const element = this.el.nativeElement as
      | HTMLInputElement
      | HTMLTextAreaElement;
    const value = element.value;

    // Check if the input starts with a space
    if (value.startsWith(' ')) {
      // Remove the leading space
      element.value = value.trimStart();
      // Dispatch an input event to update the model
      element.dispatchEvent(new Event('input'));
    }
  }
}
