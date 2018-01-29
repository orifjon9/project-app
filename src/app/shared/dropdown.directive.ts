import { Directive, ElementRef, HostBinding, HostListener, OnInit } from '@angular/core';

/**
 * Created by orifjon9 on 5/20/2017.
 */
@Directive({
  selector: '[appDropdown]'
})
export class DropDownDirective {
  @HostBinding('class.open') isOpen = false;

  constructor() { }

  @HostListener('click')
  onClickDropdown() {
    this.isOpen = !this.isOpen;
  }
}
