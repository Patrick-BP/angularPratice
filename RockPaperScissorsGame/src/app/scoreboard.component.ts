import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-scoreboard',
  template: `
    <h1>
      {{ title }}
    </h1>
    <p>Wins {{data.winCount}}- Losses  {{data.lossCount}}- Ties {{data.tieCount}}</p>
  `,
  styles: [],
})
export class ScoreboardComponent {
  title = 'Scoreboard';
 
@Input('data') data!:{winCount: number, lossCount: number, tieCount: number, computerChoice: string}
}
