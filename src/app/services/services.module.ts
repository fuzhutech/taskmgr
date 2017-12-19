import {NgModule, ModuleWithProviders} from '@angular/core';
import {QuoteService} from './quote.service';
import {ProjectService} from './project.service';
import {TaskService} from './task.service';
import {TaskListService} from './task-list.service';
import {UserService} from './user.service';

@NgModule()
export class ServicesModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ServicesModule,
            providers: [
                ProjectService,
                QuoteService,
                TaskService,
                TaskListService,
                UserService,
            ]
        };
    }
}
