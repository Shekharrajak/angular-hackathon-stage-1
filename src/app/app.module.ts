import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { TimerComponent } from './timer/timer.component';
import { GameFormComponent } from './form/game-form.component';
import { TimerService } from './time.services';
import { PostService } from './post.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

@NgModule({
    declarations: [
        AppComponent,
        GameComponent,
        TimerComponent,
        GameFormComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpModule,
        RouterModule.forRoot([
            {
                path: 'main',
                component: AppComponent
            },
            {
              path: 'submit',
              component: GameFormComponent
            },
            {
                path: '',
                redirectTo: '/main',
                pathMatch: 'full'
            }
        ])
    ],
    providers: [TimerService, PostService],
    bootstrap: [AppComponent]
})
export class AppModule { }
