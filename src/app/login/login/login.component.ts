import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

    form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            email: ['wpcfan@163.com', Validators.compose([Validators.required, Validators.email, this.validate])],
            password: ['wp123456', Validators.required]
        });
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
