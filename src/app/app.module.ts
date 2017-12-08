import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CoreModule} from './core/core.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule, MatIconModule} from '@angular/material';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginModule} from './login/login.module';
import {ProjectModule} from './project/project.module';
import {TaskModule} from './task/task.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        CoreModule,
        AppRoutingModule,
        MatSidenavModule,
        MatIconModule,
        LoginModule,
        ProjectModule,
        TaskModule,
        BrowserAnimationsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
