import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appCheat]',
})
export class CheatDirective {
 @Input('appCheat') compColor !: string;
 @HostListener('click') onclick(){
  alert(this.compColor)
 }
}
