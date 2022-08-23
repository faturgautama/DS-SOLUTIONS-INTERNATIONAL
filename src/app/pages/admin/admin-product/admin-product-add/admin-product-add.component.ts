import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { IActionButton } from 'src/app/components/layout/action-button/action-button.component';
import { FileUpload } from 'src/app/model/file-upload.model';
import { IJenis } from 'src/app/model/jenis.model';
import { IKategori } from 'src/app/model/kategori.model';
import { IProduct } from 'src/app/model/product.model';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
    selector: 'app-admin-product-add',
    templateUrl: './admin-product-add.component.html',
    styleUrls: ['./admin-product-add.component.css']
})
export class AdminProductAddComponent implements OnInit {

    FormProduct: FormGroup;

    FormProductState: 'insert' | 'update' = 'insert';

    ActionButton: IActionButton[];

    Kategori: Observable<IKategori[]>;

    Jenis: IJenis[] = [];

    SelectedFoto: any;

    SelectedProduct!: IProduct;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private storage: AngularFireStorage,
        private utilityService: UtilityService,
        private activatedRoute: ActivatedRoute,
        private dashboardService: DashboardService,
    ) {
        this.FormProduct = this.formBuilder.group({
            id_kategori: [0, [Validators.required]],
            kategori: ['', [Validators.required]],
            id_jenis: [0, [Validators.required]],
            jenis: ['', [Validators.required]],
            id_product: ['', [Validators.required]],
            product: ['', [Validators.required]],
            keterangan: ['', [Validators.required]],
            harga: [0, [Validators.required]],
            is_active: [true, [Validators.required]],
            path_foto: ["", [Validators.required]],
        });

        this.ActionButton = [
            { id: 'back', title: 'Back', icon: 'fas fa-chevron-left fa-sm' },
            { id: 'save', title: 'Simpan', icon: 'fas fa-save fa-sm' },
        ];

        this.Kategori = this.dashboardService.getKategori();
    }

    ngOnInit(): void {
        if (this.activatedRoute.snapshot.params.id) {
            this.dashboardService.getProductById(this.activatedRoute.snapshot.params.id)
                .subscribe((result) => {
                    this.FormProductState = 'update';

                    this.SelectedProduct = result;

                    this.id_kategori.setValue(result.id_kategori);
                    this.kategori.setValue(result.kategori);
                    this.id_jenis.setValue(result.id_jenis);
                    this.jenis.setValue(result.jenis);
                    this.id_product.setValue(this.activatedRoute.snapshot.params.id);
                    this.product.setValue(result.product);
                    this.keterangan.setValue(result.keterangan);
                    this.harga.setValue(result.harga);
                    this.is_active.setValue(result.is_active);
                    this.path_foto.setValue("");

                    this.ActionButton = [
                        { id: 'back', title: 'Back', icon: 'fas fa-chevron-left fa-sm' },
                        { id: 'update', title: 'Update', icon: 'fas fa-save fa-sm' },
                    ];

                    this.dashboardService.getJenis(result.id_kategori)
                        .subscribe((result) => {
                            this.Jenis = result;

                            setTimeout(() => {
                                const kategoriDropdown = document.getElementById('kategoriDropdown') as HTMLSelectElement;
                                kategoriDropdown.value = this.id_kategori.value.toString();

                                const jenisDropdown = document.getElementById('jenisDropdown') as HTMLSelectElement;
                                jenisDropdown.value = this.id_jenis.value.toString();
                            }, 500);
                        });
                });
        }
    }

    handleClickActionButton(args: IActionButton): void {
        switch (args.id) {
            case 'back':
                this.router.navigateByUrl('dashboard/product');
                break;
            case 'save':
                this.handleSubmitProduct(this.FormProduct.value);
                break;
            case 'update':
                this.handleUpdateProduct(this.FormProduct.value);
                break;
            default:
                break;
        }
    }

    handleChangeKategori(args: any): void {
        const value = parseInt(args.target.selectedOptions[0].value);
        this.id_kategori.setValue(value);

        const text = args.target.selectedOptions[0].text;
        this.kategori.setValue(text);

        this.dashboardService.getJenis(this.id_kategori.value)
            .subscribe((result) => {
                this.Jenis = result;
            });
    }

    handleChangeJenis(args: any): void {
        this.id_jenis.setValue(parseInt(args.target.selectedOptions[0].value));
        this.jenis.setValue(args.target.selectedOptions[0].text);
    }

    handleChangeFoto(args: any): void {
        this.SelectedFoto = args.target.files;
    }

    handleSubmitProduct(data: any): void {
        const file = this.SelectedFoto.item(0);
        const newFile = new FileUpload(file);

        const filePath = `product/${newFile.file.name}`;
        const storageRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, newFile.file);

        uploadTask.snapshotChanges()
            .pipe(
                finalize(() => {
                    storageRef.getDownloadURL()
                        .subscribe(url => {
                            data.path_foto = url;

                            this.dashboardService.saveProduct(data)
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
                console.log(result);
            });
    }

    handleUpdateProduct(data: any): void {
        if (this.SelectedFoto) {
            const file = this.SelectedFoto.item(0);
            const newFile = new FileUpload(file);

            const filePath = `product/${newFile.file.name}`;
            const storageRef = this.storage.ref(filePath);
            const uploadTask = this.storage.upload(filePath, newFile.file);

            uploadTask.snapshotChanges()
                .pipe(
                    finalize(() => {
                        storageRef.getDownloadURL()
                            .subscribe(url => {
                                data.path_foto = url;

                                this.dashboardService.updateProduct(data)
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
                    console.log(result);
                });
        } else {
            data.path_foto = this.SelectedProduct.path_foto;

            this.dashboardService.updateProduct(data)
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
        this.FormProduct.reset();
        this.id_kategori.setValue(0);
        this.kategori.setValue("");
        this.id_jenis.setValue(0);
        this.jenis.setValue("");
        this.id_product.setValue("");
        this.product.setValue("");
        this.keterangan.setValue("");
        this.harga.setValue(0);
        this.is_active.setValue(true);
        this.path_foto.setValue("");
    }

    get id_kategori(): AbstractControl { return this.FormProduct.get('id_kategori') as AbstractControl }
    get kategori(): AbstractControl { return this.FormProduct.get('kategori') as AbstractControl }
    get id_jenis(): AbstractControl { return this.FormProduct.get('id_jenis') as AbstractControl }
    get jenis(): AbstractControl { return this.FormProduct.get('jenis') as AbstractControl }
    get id_product(): AbstractControl { return this.FormProduct.get('id_product') as AbstractControl }
    get product(): AbstractControl { return this.FormProduct.get('product') as AbstractControl }
    get keterangan(): AbstractControl { return this.FormProduct.get('keterangan') as AbstractControl }
    get harga(): AbstractControl { return this.FormProduct.get('harga') as AbstractControl }
    get is_active(): AbstractControl { return this.FormProduct.get('is_active') as AbstractControl }
    get path_foto(): AbstractControl { return this.FormProduct.get('path_foto') as AbstractControl }
}
