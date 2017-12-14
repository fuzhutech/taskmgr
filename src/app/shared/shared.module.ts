import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSidenavModule,
} from '@angular/material';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {DirectiveModule} from '../directive/directive.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DirectiveModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatListModule,
        MatSlideToggleModule,
        MatGridListModule,
        MatDialogModule,
        MatAutocompleteModule,
        MatMenuModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatSidenavModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DirectiveModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatListModule,
        MatSlideToggleModule,
        MatGridListModule,
        MatDialogModule,
        MatAutocompleteModule,
        MatMenuModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatSidenavModule,
    ],
    declarations: [
        ConfirmDialogComponent,
    ],
    entryComponents: [
        ConfirmDialogComponent,
    ]
})
export class SharedModule {
}
