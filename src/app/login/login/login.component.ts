import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {QuoteService} from '../../services/quote.service';
import {Quote} from '../../domain/quote.model';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromQuote from '../../reducers/quote.reducer';
import * as actions from '../../actions/quote.action';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

    form: FormGroup;
    quote$: Observable<Quote>;

    constructor(private fb: FormBuilder,
                private quoteService$: QuoteService,
                private store$: Store<fromRoot.State>) {

        this.quote$ = this.store$.select(fromRoot.getQuote);

        this.quoteService$
            .getQuote()
            .subscribe(q => {
                this.store$.dispatch(new actions.QuoteLoadSuccessAction(q));
            });
    }

    ngOnInit() {
        this.form = this.fb.group({
            email: ['wpcfan@163.com', Validators.compose([Validators.required, Validators.email, this.validate])],
            password: ['wp123456', Validators.required]
        });

        this.store$.dispatch(new actions.QuoteLoadAction());
    }

    onSubmit({value, valid}, ev: Event) {
        ev.preventDefault();
        console.log(value, valid);
        // this.form.controls['email'].setValidators(this.validate);
    }

    validate(c: FormControl): { [key: string]: any } {
        if (!c.value) {
            return null;
        }

        const pattern = /^wang+/;
        if (pattern.test(c.value)) {
            return null;
        }
        return {
            emailNotValid: 'The email must start with wang'
        };
    }

}
