import {Component, OnInit, HostBinding, ChangeDetectionStrategy} from '@angular/core';
import {MatDialog} from '@angular/material';
import {NewTaskComponent} from '../new-task/new-task.component';
import {CopyTaskComponent} from '../copy-task/copy-task.component';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';
import {NewTaskListComponent} from '../new-task-list/new-task-list.component';
import {slideToRight} from '../../anim/router.anim';
import {TaskListService} from "../../services/task-list.service";

@Component({
    selector: 'app-task-home',
    templateUrl: './task-home.component.html',
    styleUrls: ['./task-home.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [slideToRight]
})
export class TaskHomeComponent implements OnInit {

    @HostBinding('@routeAnim') state;

    lists;

    constructor(private  dialog: MatDialog, private service$: TaskListService) {
        this.service$.get('Hya1moGb-').subscribe(lists => this.lists = lists);
    }

    ngOnInit() {
    }

    launchNewTaskDialog() {
        this.dialog.open(NewTaskComponent, {data: {title: '新建任务'}});
    }

    launchCopyTaskDialog() {
        this.dialog.open(CopyTaskComponent, {data: {lists: this.lists}});
    }

    launchUpdateTaskDialog(task) {
        const dialogRef = this.dialog.open(NewTaskComponent, {data: {title: '修改任务', task: task}});
    }

    launchConfirmDialog() {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {title: '删除列表', content: '你确认删除该列表吗?'}});
        dialogRef.afterClosed().subscribe(result => console.log(result));
    }

    launchEditListDialog() {
        const dialogRef = this.dialog.open(NewTaskListComponent, {data: {title: '修改列表名称'}});
        dialogRef.afterClosed().subscribe(result => console.log(result));
    }

    launchNewListDialog(event) {
        const dialogRef = this.dialog.open(NewTaskListComponent, {data: {title: '新增列表名称'}});
        dialogRef.afterClosed().subscribe(result => console.log(result));
    }

    handleMove(srcData, list) {
        switch (srcData.tag) {
            case 'task-item':
                console.log('handling item');
                break;
            case 'task-list':
                console.log('handling list');
                const srcList = srcData.data;
                const tempOrder = srcList.order;
                srcList.order = list.order;
                list.order = tempOrder;
                break;
            default:
                break;
        }
    }

    handleQuickTask(desc: string, listId: string) {
        console.log(desc, listId);
    }

}
