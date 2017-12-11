import {Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {

    @Output() toggle = new EventEmitter<void>();
    @Output() toggleDarkTheme = new EventEmitter<boolean>();

    constructor() {
    }

    ngOnInit() {
    }

    openSidebar() {
        this.toggle.emit();
    }

    onChage(checked: boolean) {
        this.toggleDarkTheme.emit(checked);
    }

}
