import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

    Form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private utilityService: UtilityService,
        private dashboardService: DashboardService,
    ) {
        this.Form = this.formBuilder.group({
            full_name: ['', [Validators.required]],
            email: ['', [Validators.required]],
            country: ['', [Validators.required]],
            message: ['', [Validators.required]],
            date_created: [new Date(), [Validators.required]],
        });
    }

    ngOnInit(): void {
    }

    handleSubmitMessage(data: any): void {
        this.dashboardService.saveMessage(data)
            .subscribe((result) => {
                if (result) {
                    this.utilityService.showCustomAlert('success', 'Success', 'Pesan Berhasil Disimpan')
                        .then(() => {
                            this.resetForm();
                        })
                }
            })
    }

    resetForm(): void {
        this.Form.reset();
        this.full_name.setValue('');
        this.email.setValue('');
        this.country.setValue('');
        this.message.setValue('');
        this.date_created.setValue(new Date());
    }

    get full_name(): AbstractControl { return this.Form.get('full_name') as AbstractControl }
    get email(): AbstractControl { return this.Form.get('email') as AbstractControl }
    get country(): AbstractControl { return this.Form.get('country') as AbstractControl }
    get message(): AbstractControl { return this.Form.get('message') as AbstractControl }
    get date_created(): AbstractControl { return this.Form.get('date_created') as AbstractControl }

}
