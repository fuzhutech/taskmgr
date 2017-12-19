import {Component, OnInit, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {MatDialog} from '@angular/material';
import {NewProjectComponent} from '../new-project/new-project.component';
import {InviteComponent} from '../invite/invite.component';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';
import {slideToRight} from '../../anim/router.anim';
import {listAnimation} from '../../anim/list.anim';
import {ProjectService} from '../../services';
import {Project} from '../../domain';
import {Observable} from 'rxjs/Observable';
import * as _ from 'lodash';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-project-list',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [slideToRight, listAnimation]
})
export class ProjectListComponent implements OnInit, OnDestroy {

    @HostBinding('@routeAnim') state;

    projects = [];
    sub: Subscription;

    constructor(private dialog: MatDialog, private  service$: ProjectService, private cd: ChangeDetectorRef) {

    }

    ngOnInit() {
        this.sub = this.service$.get('1').subscribe(projects => {
            this.projects = projects;
            this.cd.markForCheck();
        });

    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    selectProject(project: Project) {
        console.log(project);
    }

    openNewProjectDialog() {
        const img = `/assets/img/covers/${Math.floor(Math.random() * 40)}_tn.jpg`;
        const dialogRef = this.dialog.open(NewProjectComponent,
            {data: {thumbnails: this.getThumbnailsObs(), img: img}});
        dialogRef.afterClosed()
            .take(1)           // 不用去销毁，自动完成状态
            .filter(n => n)
            .map(val => ({...val, coverImg: this.buildImgSrc(val.coverImg)}))
            .switchMap(project => this.service$.add(project))
            .subscribe(project => {
                this.projects = [...this.projects, project];
                this.cd.markForCheck();
            });
    }

    launchInvite() {
        const dialogRef = this.dialog.open(InviteComponent);
    }

    launchUpdateDialog(project: Project) {
        const dialogRef = this.dialog.open(NewProjectComponent,
            {data: {thumbnails: this.getThumbnailsObs(), project: project}});
        dialogRef.afterClosed()
            .take(1)           // 不用去销毁，自动完成状态
            .filter(n => n)
            .map(val => ({...val, id: project.id, coverImg: this.buildImgSrc(val.coverImg)}))
            .switchMap(v => this.service$.update(v))
            .subscribe(val => {
                const index = this.projects.map(p => p.id).indexOf(project.id);
                this.projects = [...this.projects.slice(0, index), val, ...this.projects.slice(index + 1)];
                this.cd.markForCheck();
            });
    }

    launchConfirmDialog(project) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {title: '删除项目', content: '你确认删除该项目吗?'}});
        dialogRef.afterClosed()
            .take(1)           // 不用去销毁，自动完成状态
            .filter(n => n)
            .switchMap(_v => this.service$.del(project))
            .subscribe(prj => {
                this.projects = this.projects.filter(p => p.id !== prj.id);
                this.cd.markForCheck();
            });
    }

    private getThumbnailsObs() {
        return _.range(0, 40)
            .map(i => `/assets/img/covers/${i}_tn.jpg`);
    }

    private buildImgSrc(img: string): string {
        return img.indexOf('_') > -1 ? img.split('_', 1)[0] + '.jpg' : img;
    }

}
