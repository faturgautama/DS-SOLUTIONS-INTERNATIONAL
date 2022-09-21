import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IActionButton } from 'src/app/components/layout/action-button/action-button.component';
import { IEvent } from 'src/app/model/event.model';
import { FileUpload } from 'src/app/model/file-upload.model';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
    selector: 'app-admin-event-add',
    templateUrl: './admin-event-add.component.html',
    styleUrls: ['./admin-event-add.component.css']
})
export class AdminEventAddComponent implements OnInit {

    ActionButton: IActionButton[] = [
        { id: 'back', title: 'Back', icon: 'fas fa-chevron-left' },
        { id: 'save', title: 'Save', icon: 'fas fa-save' },
    ];

    FormEvent: FormGroup;

    FormEventState: 'insert' | 'update' = 'insert';

    SelectedFoto: any;

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

    SelectedEvent!: IEvent;

    constructor(
        private router: Router,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private storage: AngularFireStorage,
        private utilityService: UtilityService,
        private activatedRoute: ActivatedRoute,
        private dashboardService: DashboardService,
    ) {
        this.FormEvent = this.formBuilder.group({
            id_event: ['', []],
            judul: ['', [Validators.required]],
            author: ['', [Validators.required]],
            location: ['', [Validators.required]],
            content: ['', [Validators.required]],
            path_foto: ['', [Validators.required]],
            time_created: [new Date(), []],
            user_created: [this.authService.getUserData().displayName, []]
        });
    }

    ngOnInit(): void {
        if (this.activatedRoute.snapshot.params.id) {
            this.dashboardService.getEventById(this.activatedRoute.snapshot.params.id)
                .subscribe((result) => {
                    this.FormEventState = 'update';

                    this.SelectedEvent = result;

                    this.id_event.setValue(this.activatedRoute.snapshot.params.id);
                    this.judul.setValue(result.judul);
                    this.author.setValue(result.author);
                    this.location.setValue(result.location);
                    this.content.setValue(result.content);
                    this.path_foto.setValue("");

                    this.ActionButton = [
                        { id: 'back', title: 'Back', icon: 'fas fa-chevron-left fa-sm' },
                        { id: 'update', title: 'Update', icon: 'fas fa-save fa-sm' },
                        { id: 'delete', title: 'Delete', icon: 'fas fa-trash fa-sm' },
                    ];
                });
        }
    }

    handleClickActionButton(data: IActionButton): void {
        switch (data.id) {
            case 'back':
                this.router.navigateByUrl('dashboard/event');
                break;
            case 'save':
                this.handleSubmitEvent(this.FormEvent.value);
                break;
            case 'update':
                this.handleUpdateProduct(this.FormEvent.value);
                break;
            case 'delete':
                this.dashboardService.deleteEvent(this.id_event.value)
                    .subscribe((result) => {
                        this.utilityService.showCustomAlert('success', 'Success', 'Berhasil Hapus Data')
                            .then(() => {
                                this.router.navigateByUrl('dashboard/event');
                            });
                    });
                break;
            default:
                break;
        }
    }

    handleChangeFoto(args: any): void {
        this.SelectedFoto = args.target.files;
    }

    handleSubmitEvent(data: IEvent): void {
        const file = this.SelectedFoto.item(0);
        const newFile = new FileUpload(file);

        const filePath = `event/${newFile.file.name}`;
        const storageRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, newFile.file);

        uploadTask.snapshotChanges()
            .pipe(
                finalize(() => {
                    storageRef.getDownloadURL()
                        .subscribe(url => {
                            data.path_foto = url;

                            this.dashboardService.saveEvent(data)
                                .subscribe((result) => {
                                    if (result) {
                                        this.utilityService.showCustomAlert('success', 'Success', 'Data Berhasil Disimpan')
                                            .then(() => {
                                                this.resetForm();
                                            })
                                    }
                                })
                        })
                })
            ).subscribe((result) => {
                // console.log(result);
            });
    }

    handleUpdateProduct(data: IEvent): void {
        if (this.SelectedFoto) {
            const file = this.SelectedFoto.item(0);
            const newFile = new FileUpload(file);

            const filePath = `event/${newFile.file.name}`;
            const storageRef = this.storage.ref(filePath);
            const uploadTask = this.storage.upload(filePath, newFile.file);

            uploadTask.snapshotChanges()
                .pipe(
                    finalize(() => {
                        storageRef.getDownloadURL()
                            .subscribe(url => {
                                data.path_foto = url;

                                this.dashboardService.updateEvent(data)
                                    .subscribe((result) => {
                                        if (result) {
                                            this.utilityService.showCustomAlert('success', 'Success', 'Data Berhasil Diupdate')
                                                .then(() => {
                                                    this.resetForm();
                                                })
                                        }
                                    })
                            })
                    })
                ).subscribe((result) => {
                    // console.log(result);
                });
        } else {
            data.path_foto = this.SelectedEvent.path_foto;

            this.dashboardService.updateEvent(data)
                .subscribe((result) => {
                    if (result) {
                        this.utilityService.showCustomAlert('success', 'Success', 'Data Berhasil Diupdate')
                            .then(() => {
                                this.resetForm();
                            })
                    }
                })
        }
    }

    resetForm(): void {
        this.FormEvent.reset();
        this.id_event.setValue('');
        this.judul.setValue('');
        this.author.setValue('');
        this.location.setValue('');
        this.content.setValue('');
        this.path_foto.setValue('');
    }

    get id_event(): AbstractControl { return this.FormEvent.get('id_event') as AbstractControl }
    get judul(): AbstractControl { return this.FormEvent.get('judul') as AbstractControl }
    get author(): AbstractControl { return this.FormEvent.get('author') as AbstractControl }
    get location(): AbstractControl { return this.FormEvent.get('location') as AbstractControl }
    get content(): AbstractControl { return this.FormEvent.get('content') as AbstractControl }
    get path_foto(): AbstractControl { return this.FormEvent.get('path_foto') as AbstractControl }
}
