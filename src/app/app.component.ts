import {Component} from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';
import {trigger, state, transition, style, animate} from '@angular/animations';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        trigger('square',
            [
                state('green', style({'background-color': 'green', 'height': '100px', 'transform': 'translateX(0)'})),
                state('red', style({'background-color': 'red', 'height': '50px', 'transform': 'translateX(100%)'})),
                transition('green => red', animate('.2s 1s')),
                transition('red => green', animate(1000))
            ])
    ]
})
export class AppComponent {
    squareState: string;
    title = 'app';
    darkTheme = false;

    constructor(private overlayContainer: OverlayContainer) {
        this.squareState = 'square';
    }

    switchTheme(dark: boolean) {
        this.darkTheme = dark;
        if (dark) {
            this.overlayContainer.getContainerElement().classList.add('myapp-dark-theme');
        } else {
            this.overlayContainer.getContainerElement().classList.remove('myapp-dark-theme');
        }
    }

    onClick() {
        this.squareState = this.squareState === 'red' ? 'green' : 'red';
    }
}
