import { Component, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

    AuthenticationModalRef?: BsModalRef;

    Form: FormGroup;

    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private bsModalService: BsModalService,
    ) {
        this.Form = this.formBuilder.group({
            email: ['', [Validators.required]],
            password: ['', [Validators.required]],
            returnSecureToken: [true, []]
        });
    }

    ngOnInit(): void {
    }

    openModalAuth(template: TemplateRef<any>): void {
        this.AuthenticationModalRef =
            this.bsModalService.show(
                template, Object.assign({}, {
                    class: 'modal-dialog-centered'
                })
            );
    }

    handleSignIn(data: any): void {
        this.authService.signIn(data)
            .subscribe((result) => {
                if (result) {
                    this.bsModalService.hide();
                }
            })
    }

    get email(): AbstractControl { return this.Form.get('email') as AbstractControl }
    get password(): AbstractControl { return this.Form.get('password') as AbstractControl }
}
