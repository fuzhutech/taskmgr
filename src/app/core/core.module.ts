import {NgModule, SkipSelf, Optional} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {MatToolbarModule, MatIconModule, MatButtonModule} from '@angular/material';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {loadSvgResource} from '../utils/svg.util';

import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule, HttpClientModule,
    MatToolbarModule, MatIconModule, MatButtonModule
  ],
  declarations: [HeaderComponent, FooterComponent, SidebarComponent],
  exports: [
    HeaderComponent, FooterComponent, SidebarComponent
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
