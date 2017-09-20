import { Component, OnInit } from '@angular/core';
import { TimerService } from '../time.services';
import { Observable } from 'rxjs/Rx';

@Component({
selector: 'app-timer',
templateUrl: './timer.component.html',
styleUrls: ['./timer.component.css']
})

export class TimerComponent {
    public time: number;
    private timer: any;

    // turn variable to true whenever timer is runnning
    public timeStarted: boolean;

    // turn to variable to true is the running timer is to be stopped
    public mustStop = false;

    // start timer as soon as created
    constructor(public stopwatchService: TimerService) {
        this.time = 0;
        this.timeStarted = false;

        // start aas soon the component is called
        // this.start();

        // observe time every milli sec and call function stop_on_this at 10 sec
        Observable.interval(1).subscribe(x => {
                this.stop_on_this(1000 * 10);
            }
        );
    }

    // formatting to output the result
    formatTime(timeMs: number) {
        let minutes: string, seconds: string;

        minutes = Math.floor(timeMs / 60000).toString();
        seconds = ((timeMs % 60000) / 1000).toFixed(3);
        return minutes + ':' + (+seconds < 10 ? '0' : '') + seconds;
    }

    // return actual time so that it can be displayed
    getUpdate() {
        return () => {
            this.time = this.stopwatchService.time();
        };
    }

    reset() {
        this.stopwatchService.reset();
        this.timeStarted = false;
        // this.update();
        // this.start();
        // this.timeStarted = true;
        // this.mustStop = false;
    }

    // stops time at 10 sec, stop time, set mustStop = true
    stop_on_this(at_this_time): void {
        if (!this.mustStop) {
            if (this.time >= at_this_time) {
                this.stop();
                this.mustStop = true;
                this.gameEnded();
            }
        }
    }

    // start timer which checks for time update every second
    start() {
        setInterval(this.getUpdate(), 1);
        this.stopwatchService.start();
        this.timeStarted = true;
        this.mustStop = false;
    }

    start_from_pause() {
        this.stopwatchService.start();
        this.timeStarted = true;
        this.mustStop = false;
    }

    // stop time
    stop() {
        this.stopwatchService.stop();
        this.timeStarted = false;
        this.mustStop = false;
    }

    // pause or play timer
    toggle() {
        if (this.timeStarted) {
            this.stop();
        } else {
            this.start_from_pause();
        }
    }

    gameEnded() {
        return this.mustStop;
    }

    timeRunning() {
        return this.timeStarted;
    }
}
