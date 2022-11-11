import { Component, HostBinding, OnDestroy, DoCheck } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Hex Color Guessing Game</h1>
    <p>
      Scoreboard: Wins: {{ scroreBoard.win }} - Losses: {{ scroreBoard.looses }}
    </p>
    <div
      class="colorBox"
      [ngStyle]="{ 'background-color': computerColor }"
      [appCheat]="computerColor"
    ></div>
    <div>
      <button
        *ngFor="let color of colors"
        (click)="handleClick(color)"
        [ngClass]="{ disable: btnShown }"
      >
        {{ color }}
      </button>
    </div>

    <div *ngIf="showResponse">
      <p>{{ response }}</p>
      <p>Resetting in {{ timeLeft }} seconds</p>
    </div>
  `,
  styles: [
    `
      .colorBox {
        width: 400px;
        height: 100px;

        border: 1px solid;
      }
      button {
        padding: 10px;
        font-size: 20px;
        margin: 20px;
      }
      p {
        font-size: 20px;
      }
      .disable {
        cursor: not-allowed;
        pointer-events: none;
        background-color: white;
        border: 0.1px solid #d0d0d5;
        color: gray;
      }
    `,
  ],
})
export class AppComponent implements OnDestroy {

  title = 'myapp';
  scroreBoard: { win: number; looses: number } = { win: 0, looses: 0 };
  colors: string[] = Array.from({ length: 3 }, this.generateRandomHexColor);
  computerColor: string = this.getRandomItemFromArray(this.colors);
  btnShown: boolean = false;
  response!: string;
  showResponse: boolean = false;
  timeLeft: number = 5;
  interv!: ReturnType<typeof setInterval>;
  restTimer!:ReturnType<typeof setTimeout>
  rest(): void {
   this.restTimer = setTimeout(() => {
      this.colors = Array.from({ length: 3 }, this.generateRandomHexColor);
      this.computerColor = this.getRandomItemFromArray(this.colors);
      this.btnShown = false;
      this.showResponse = false;
    }, 5000);
  }

  handleClick(answer: string): void {
    this.interv = setInterval(() => {
      if (this.timeLeft <= 0) {
        this.timeLeft = 6;
        clearInterval(this.interv);
      }
      console.log(this.timeLeft);
      this.timeLeft--;
    }, 1000);

    this.btnShown = true;
    if (answer === this.computerColor) {
      this.scroreBoard.win++;
      this.response = 'You Won!!';
      this.showResponse = true;
      this.rest();
    } else {
      this.scroreBoard.looses++;
      this.response = 'Incorrect Answer, the answer is: ' + this.computerColor;
      this.showResponse = true;
      this.rest();
    }
  }

  private generateRandomHexColor(): string {
    return (
      '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')
    );
  }

  private getRandomItemFromArray(arr: string[]): string {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  ngOnDestroy(): void {
    clearInterval(this.interv)
    clearTimeout(this.restTimer)
    console.log("destroy");
  }
}
