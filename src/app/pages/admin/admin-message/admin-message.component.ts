import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IMessage } from 'src/app/model/message.model';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
    selector: 'app-admin-message',
    templateUrl: './admin-message.component.html',
    styleUrls: ['./admin-message.component.css']
})
export class AdminMessageComponent implements OnInit {

    Message: Observable<IMessage[]>

    Form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private dashboardService: DashboardService,
    ) {
        this.Form = this.formBuilder.group({
            id_message: ['', [Validators.required]],
            full_name: ['', [Validators.required]],
            email: ['', [Validators.required]],
            country: ['', [Validators.required]],
            message: ['', [Validators.required]],
            date_created: ['', [Validators.required]],
        });

        this.Message = this.dashboardService.getMessage();
    }

    ngOnInit(): void {
    }

    handleSeeDetailMessage(data: IMessage): void {
        data.date_created = formatDate(data.date_created, 'dd MMMM yyyy, HH:mm:ss', 'EN') as any;
        this.Form.setValue(data);
    }

    get id_message(): AbstractControl { return this.Form.get('id_message') as AbstractControl }
    get full_name(): AbstractControl { return this.Form.get('full_name') as AbstractControl }
    get email(): AbstractControl { return this.Form.get('email') as AbstractControl }
    get country(): AbstractControl { return this.Form.get('country') as AbstractControl }
    get message(): AbstractControl { return this.Form.get('message') as AbstractControl }
    get date_created(): AbstractControl { return this.Form.get('date_created') as AbstractControl }
}
