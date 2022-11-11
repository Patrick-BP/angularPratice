import { Component, DoCheck, Output } from '@angular/core';
import { choices } from './choices';
@Component({
  selector: 'app-root',
  template: `
    <h1>{{ title }}</h1>
    <app-scoreboard [data]="score"></app-scoreboard>
    <app-buttons (playerChoice)="handleChoice($event)"></app-buttons>
    <app-cheating [cheat]="score.computerChoice"></app-cheating>
  `,
  styles: [''],
})
export class AppComponent implements DoCheck{
  title = 'Rock Paper Scissors Game';
  score: {
    winCount: number;
    lossCount: number;
    tieCount: number;
    computerChoice: string;
  } = { winCount: 0, lossCount: 0, tieCount: 0, computerChoice: '' };
 
  handleChoice(e: string) {
    this.compare(e, this.score.computerChoice)
  }
constructor(){
  this.score.computerChoice = choices[this.rand()]
}
  ngDoCheck():void{
this.score.computerChoice = choices[this.rand()]
  }

  rand(){
    return Math.floor(Math.random()*3)
  }

  compare(playerChoice: string, computerChoice: string): string {
    //Checking for a tie
    if (playerChoice === computerChoice) {
      this.score.tieCount++;
      return 'It is a tie';
    }

    //Check for Rock
    if (playerChoice === 'rock') {
      if (computerChoice === 'scissors') {
        this.score.winCount++;
        return 'Player Wins';
      } else {
        this.score.lossCount++;
        return 'Computer Wins';
      }
    }
    //Check for Paper
    if (playerChoice === 'paper') {
      if (computerChoice === 'scissors') {
        this.score.winCount++;
        return 'Computer Wins';
      } else {
        this.score.lossCount++;
        return 'Player Wins';
      }
    }
    //Check for Scissors
    if (playerChoice === 'scissors') {
      if (computerChoice === 'rock') {
        this.score.winCount++;
        return 'Computer Wins';
      } else {
        this.score.lossCount++;
        return 'Player Wins';
      }
    }
    return '';
  }
}
