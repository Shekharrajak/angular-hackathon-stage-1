import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit {

    redId: number;
    temp: number;

    colorChangeId: any;

    // store the score
    score: number;

    // variable that is true when the game is in progress or paused, false when game not started or ended
    @Input() isGameOn = false;
    @Input() isGameRunning = false;

    constructor () {
        this.score = 0;
        this.colorChangeId = setInterval(() => { this.changeColor(); if (!this.isGameOn) {clearInterval(this.colorChangeId); } }, 1000 * 2);
    }

    // on initialization
    ngOnInit() {
        this.redId = this.getRandomintInclusive(1, 4);
    }

    // start our game, set score to 0, set isGameOn to True
    startGame() {
        this.score = 0;
        this.isGameOn = true;
        this.isGameRunning = true;
    }

    // generate random Number
    getRandomintInclusive(a: number, b: number) {
        a = Math.ceil(a);
        b = Math.floor(b);

        return Math.floor(Math.random() * (b - a + 1 )) + a;
    }

    // set Color
    setColor(id: number) {
        if (id === this.redId) {
        return 'red';
        } else {
        return 'black';
        }
    }

    // change Color
    changeColor() {
        // get a random number
        this.temp = this.getRandomintInclusive(1, 4);

        // dont set box color till this and previous random number is same
        while (this.temp === this.redId)  {
            this.temp = this.getRandomintInclusive(1, 4);
        }

        this.redId = this.temp;
    }

    // sending Id of clicked box
    sendId (clickedId: number) {

        // if id of clicked box is same as the id of box with red color change color and increment score
        if (this.redId === clickedId && this.isGameOn ) {
            this.score = this.score + 1;
            this.changeColor();
        }
    }
}
