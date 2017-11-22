import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';

import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login/login.component';

@NgModule({
  imports: [
    SharedModule,
    MatFormFieldModule,
    FormsModule, ReactiveFormsModule,
    LoginRoutingModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule {
}
