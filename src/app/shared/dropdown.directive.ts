import { Directive, HostListener, HostBinding } from '../../../node_modules/@angular/core';

@Directive({
    selector: '[AppDropdown]'
})

export class DropdownDirective{
    @HostBinding('class.open') isOpen = false;
    @HostListener('click') toggleOpen(){
        this.isOpen = !this.isOpen;
    }
}