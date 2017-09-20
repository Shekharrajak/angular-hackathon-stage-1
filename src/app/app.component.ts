import { Component, OnInit, ViewChild } from '@angular/core';
import { TimerComponent } from './timer/timer.component';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
    start = false;
    title = 'Checkers';
    gameEnded: boolean;


    @ViewChild(TimerComponent)
    private _time: TimerComponent;

    constructor () {
        Observable.interval(1).subscribe(x => {
            this.gameEnded = this._time.gameEnded();
            }
        );
    }

    myfunction() {
        if (this.gameEnded === true) {
            return false;
        }
    }

    onClick() {
      this.start = true;
    }

    onSubmit() {
        this.start = false;
    }
}
