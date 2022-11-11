import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cheating',
  template: `
    <h1>
      {{title}}
    </h1>
    <h2>Current computer choice is {{compChoice}}</h2>
  `,
  styles: [
  ]
})
export class CheatingComponent  {
  title = 'Cheating';

@Input('cheat') compChoice!:string;
}
