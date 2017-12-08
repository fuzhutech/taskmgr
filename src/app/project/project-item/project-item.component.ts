import {Component, OnInit, Input, Output, EventEmitter, HostBinding, HostListener} from '@angular/core';
import {cardAnim} from '../../anim/card.anim';

@Component({
    selector: 'app-project-item',
    templateUrl: './project-item.component.html',
    styleUrls: ['./project-item.component.scss'],
    animations: [
        cardAnim
    ]
})
export class ProjectItemComponent implements OnInit {

    @Input() item;
    @Output() onInvite = new EventEmitter<void>();
    @Output() onEdit = new EventEmitter<void>();
    @Output() onDel = new EventEmitter<void>();
    @HostBinding('@card') cardState = 'out';  // 绑定到宿主,app-project-item

    constructor() {
    }

    ngOnInit() {
    }

    @HostListener('mouseenter')
    onMouseEnter() {
        this.cardState = 'hover';
    }

    @HostListener('mouseleave')
    onMouseLeave() {
        this.cardState = 'out';
    }

    onInviteClick() {
        this.onInvite.emit();
    }

    onEditClick() {
        this.onEdit.emit();
    }

    onDeleteClick() {
        this.onDel.emit();
    }

}
