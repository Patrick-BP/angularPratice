import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { choices } from './choices';
@Component({
  selector: 'app-buttons',
  template: `
    <div>
      <h1>Choose an option</h1>
      <button (click)="handleClick(0)">Rock</button>
      <button (click)="handleClick(1)">Paper</button>
      <button (click)="handleClick(2)">Scissors</button>
    </div>
  `,
  styles: [
  ]
})
export class ButtonsComponent  {
  title = 'Choose an option';

@Output() playerChoice: EventEmitter<string> = new EventEmitter()
  handleClick(e:number){
this.playerChoice.emit(choices[e])
  }
  
}
