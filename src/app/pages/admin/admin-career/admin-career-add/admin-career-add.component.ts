import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IActionButton } from 'src/app/components/layout/action-button/action-button.component';
import { ICareer } from 'src/app/model/career.model';
import { AuthService } from 'src/app/services/auth.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
    selector: 'app-admin-career-add',
    templateUrl: './admin-career-add.component.html',
    styleUrls: ['./admin-career-add.component.css']
})
export class AdminCareerAddComponent implements OnInit {

    ActionButton: IActionButton[] = [
        { id: 'back', title: 'Back', icon: 'fas fa-chevron-left' },
        { id: 'save', title: 'Save', icon: 'fas fa-save' },
    ];

    Form: FormGroup;
    FormState: 'insert' | 'update' = 'insert';

    ToolbarRte: object = {
        items: [
            'Undo', 'Redo', '|',
            'Bold', 'Italic', 'Underline', '|',
            'FontSize', 'FontColor', '|',
            'LowerCase', 'UpperCase', '|',
            'Alignments', '|',
            'OrderedList', 'UnorderedList', '|',
            'Indent', 'Outdent',
        ]
    };

    SelectedCareer!: ICareer;

    constructor(
        private router: Router,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private utilityService: UtilityService,
        private activatedRoute: ActivatedRoute,
        private dashboardService: DashboardService,
    ) {
        this.Form = this.formBuilder.group({
            id_career: ['', [Validators.required]],
            title: ['', [Validators.required]],
            location: ['', [Validators.required]],
            department: ['', [Validators.required]],
            content: ['', [Validators.required]],
            user_created: [this.authService.getUserData().displayName, [Validators.required]],
            time_created: [new Date(), [Validators.required]],
            is_active: [true, [Validators.required]],
        })
    }

    ngOnInit(): void {
        if (this.activatedRoute.snapshot.params.id) {
            this.dashboardService.getCareerById(this.activatedRoute.snapshot.params.id)
                .subscribe((result) => {
                    this.FormState = 'update';

                    this.SelectedCareer = result;

                    this.id_career.setValue(this.activatedRoute.snapshot.params.id);
                    this.title.setValue(result.title);
                    this.location.setValue(result.location);
                    this.department.setValue(result.department);
                    this.content.setValue(result.content);
                    this.user_created.setValue(result.user_created);
                    this.time_created.setValue(result.time_created);
                    this.is_active.setValue(result.is_active);

                    this.ActionButton = [
                        { id: 'back', title: 'Back', icon: 'fas fa-chevron-left fa-sm' },
                        { id: 'update', title: 'Update', icon: 'fas fa-save fa-sm' },
                    ];
                });
        }
    }

    handleClickActionButton(data: IActionButton): void {
        switch (data.id) {
            case 'back':
                this.router.navigateByUrl('dashboard/career');
                break;
            case 'save':
                this.handleSubmitForm(this.Form.value);
                break;
            case 'update':
                this.handleUpdateCareer(this.Form.value);
                break;
            default:
                break;
        }
    }

    handleSubmitForm(data: ICareer): void {
        this.dashboardService.saveCareer(data)
            .subscribe((result) => {
                if (result) {
                    this.utilityService.showCustomAlert('success', 'Success', 'Data Berhasil Disimpan')
                        .then(() => {
                            this.resetForm();
                        })
                }
            })
    }

    handleUpdateCareer(data: ICareer): void {
        this.dashboardService.updateCareer(data)
            .subscribe((result) => {
                if (result) {
                    this.utilityService.showCustomAlert('success', 'Success', 'Data Berhasil Diupdate')
                        .then(() => {
                            this.resetForm();
                            this.router.navigateByUrl('dashboard/career');
                        })
                }
            })
    }

    resetForm(): void {
        this.Form.reset();
        this.id_career.setValue('');
        this.title.setValue('');
        this.location.setValue('');
        this.department.setValue('');
        this.content.setValue('');
        this.user_created.setValue('');
        this.time_created.setValue(new Date());
        this.is_active.setValue(true);
    }

    get id_career(): AbstractControl { return this.Form.get('id_career') as AbstractControl }
    get title(): AbstractControl { return this.Form.get('title') as AbstractControl }
    get location(): AbstractControl { return this.Form.get('location') as AbstractControl }
    get department(): AbstractControl { return this.Form.get('department') as AbstractControl }
    get content(): AbstractControl { return this.Form.get('content') as AbstractControl }
    get user_created(): AbstractControl { return this.Form.get('user_created') as AbstractControl }
    get time_created(): AbstractControl { return this.Form.get('time_created') as AbstractControl }
    get is_active(): AbstractControl { return this.Form.get('is_active') as AbstractControl }
}
