import {NgModule, SkipSelf, Optional} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from '../shared/shared.module';

import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {loadSvgResource} from '../utils/svg.util';

import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

import 'hammerjs';
import {AppRoutingModule} from '../app-routing.module';

@NgModule({
    imports: [
        SharedModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        SidebarComponent
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
        AppRoutingModule,
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parent: CoreModule, ir: MatIconRegistry, ds: DomSanitizer) {
        if (parent) {
            throw new Error('模块已经存在，不能再次加载!');
        }

        loadSvgResource(ir, ds);
    }
}
