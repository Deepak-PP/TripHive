import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { userService } from '../user/user.service';


@Directive({
  selector: '[appImageFileValidator]',
})
export class appImageFileValidator {
  @Input() allowedExtensions: string[] = ['.jpg', '.jpeg', '.png', '.bmp'];

  constructor(private el: ElementRef,private userService:userService) {}

  @HostListener('change') onChange() {
    const fileInput = this.el.nativeElement;
    const filePath = fileInput.value;

    const isValid = this.allowedExtensions.some((ext) =>
      filePath.toLowerCase().endsWith(ext)
    );

    if (!isValid) {
        fileInput.value = '';
        this.userService.notifySwal(
          'Invalid file type. Please upload an image file with one of the following extensions: .jpg, .jpeg, .png, .bmp',
          'info'
        );
     
        
      
    }
  }
}
