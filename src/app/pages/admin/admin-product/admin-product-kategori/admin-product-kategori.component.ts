import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { FileUpload } from 'src/app/model/file-upload.model';
import { IKategori } from 'src/app/model/kategori.model';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
    selector: 'app-admin-product-kategori',
    templateUrl: './admin-product-kategori.component.html',
    styleUrls: ['./admin-product-kategori.component.css']
})
export class AdminProductKategoriComponent implements OnInit {

    Kategori: IKategori[] = [];
    SelectedKategori: IKategori = null as any;

    Form: FormGroup;
    FormState: 'edit' | 'insert' = 'insert';

    SelectedFoto: any;

    constructor(
        private formBuilder: FormBuilder,
        private storage: AngularFireStorage,
        private utilityService: UtilityService,
        private dashboardService: DashboardService,
    ) {
        this.Form = this.formBuilder.group({
            id_kategori: [0, [Validators.required]],
            kategori: ["", [Validators.required]],
            keterangan: ["", [Validators.required]],
            path_foto: ["", [Validators.required]]
        });
    }

    ngOnInit(): void {
        this.getAll();
    }

    getAll(): void {
        this.dashboardService.getKategori()
            .subscribe((result) => {
                if (result) {
                    this.Kategori = result;
                };
            });
    }

    selectedKategori(data: IKategori): void {
        this.SelectedKategori = data;
        this.changeClassActiveKategori(this.SelectedKategori);
        this.id_kategori.setValue(data.id_kategori);
        this.kategori.setValue(data.kategori);
        this.keterangan.setValue(data.keterangan);
        this.path_foto.setValue(data.path_foto);
        this.FormState = 'edit';
    }

    changeClassActiveKategori(data: IKategori): void {
        this.Kategori.forEach((item) => {
            if (item.id_kategori !== data.id_kategori) {
                const otherEl = document.getElementById(`${item.id_kategori}_list_item`) as HTMLElement;
                otherEl.classList.contains('active') ? otherEl.classList.remove('active') : null;
            } else {
                const el = document.getElementById(`${data.id_kategori}_list_item`) as HTMLElement;
                el.classList.add('active');
            }
        });
    }

    handleChangeFoto(args: any): void {
        this.SelectedFoto = args.target.files;
    }

    insert(data: IKategori): void {
        const file = this.SelectedFoto.item(0);
        const newFile = new FileUpload(file);

        const filePath = `kategori/${newFile.file.name}`;
        const storageRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, newFile.file);

        this.utilityService.showLoader();

        uploadTask.snapshotChanges()
            .pipe(
                finalize(() => {
                    storageRef.getDownloadURL()
                        .subscribe(url => {
                            data.path_foto = url;

                            this.dashboardService.saveKategori(data)
                                .subscribe((result) => {
                                    if (result) {
                                        this.utilityService.closeLoader();

                                        this.utilityService.showCustomAlert('success', 'Success', 'Data Berhasil Disimpan')
                                            .then(() => {
                                                this.resetForm();
                                                this.getAll();
                                            })
                                    }
                                })
                        })
                })
            ).subscribe((result) => {
                // console.log(result);
            });


    }

    update(data: IKategori): void {
        if (this.SelectedFoto) {
            const file = this.SelectedFoto.item(0);
            const newFile = new FileUpload(file);

            const filePath = `kategori/${newFile.file.name}`;
            const storageRef = this.storage.ref(filePath);
            const uploadTask = this.storage.upload(filePath, newFile.file);

            this.utilityService.showLoader();

            this.storage.storage.refFromURL(data.path_foto).delete()
                .then(() => {
                    uploadTask.snapshotChanges()
                        .pipe(
                            finalize(() => {
                                storageRef.getDownloadURL()
                                    .subscribe(url => {

                                        data.path_foto = url;

                                        this.dashboardService.updateKategori(data)
                                            .subscribe((result) => {
                                                if (result) {
                                                    this.utilityService.closeLoader();

                                                    this.utilityService.showCustomAlert('success', 'Success', 'Data Berhasil Diupdate')
                                                        .then(() => {
                                                            this.resetForm();
                                                            this.getAll();
                                                        })
                                                }
                                            })
                                    })
                            })
                        ).subscribe((result) => {
                            // console.log(result);
                        });
                })

        } else {
            data.path_foto = this.SelectedKategori.path_foto;

            this.utilityService.showLoader();

            this.dashboardService.updateKategori(data)
                .subscribe((result) => {
                    if (result) {
                        this.utilityService.closeLoader();

                        this.utilityService.showCustomAlert('success', 'Success', 'Data Berhasil Diupdate')
                            .then(() => {
                                this.resetForm();
                                this.getAll();
                            })
                    }
                })
        }
    }

    delete(data: IKategori): void {
        this.utilityService.showLoader();

        this.storage.storage.refFromURL(data.path_foto).delete()
            .then(() => {
                this.dashboardService.deleteKategori(data.id_kategori)
                    .subscribe((result) => {
                        if (result) {
                            this.utilityService.closeLoader();

                            this.utilityService.showCustomAlert('success', 'Success', 'Data Berhasil Dihapus')
                                .then(() => {
                                    this.resetForm();
                                    this.getAll();
                                })
                        }
                    })
            });
    }

    resetForm(): void {
        this.Form.reset();
        this.id_kategori.setValue(0);
        this.kategori.setValue("");
        this.keterangan.setValue("");
        this.SelectedKategori = null as any;
        this.FormState = 'insert';
    }

    get id_kategori(): AbstractControl { return this.Form.get('id_kategori') as AbstractControl }
    get kategori(): AbstractControl { return this.Form.get('kategori') as AbstractControl }
    get keterangan(): AbstractControl { return this.Form.get('keterangan') as AbstractControl }
    get path_foto(): AbstractControl { return this.Form.get('path_foto') as AbstractControl }
}
