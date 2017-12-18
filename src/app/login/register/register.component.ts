import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {
    selectedTab = 0;
    form: FormGroup;

    items: string[];
    private readonly avatarName = 'avatars';

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        const img = `${this.avatarName}:svg-${(Math.random() * 16).toFixed()}`;
        const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
        this.items = nums.map(d => `avatars:svg-${d}`);

        this.form = this.fb.group({
            name: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
            repeat: ['', Validators.required],
            avatar: [img],
            dateOfBirth: [''],
            address: ['', Validators.maxLength(80)],
            identity: []
        });
    }

    onSubmit({value, valid}, e: Event) {
        console.log(value, valid);
        e.preventDefault();
        if (!valid) {
            return;
        }
        console.log(value, valid);
    }

    prevTab() {
        this.selectedTab = 0;
    }

    nextTab() {
        this.selectedTab = 1;
    }

    onTabChange(index) {
        this.selectedTab = index;
    }

}
