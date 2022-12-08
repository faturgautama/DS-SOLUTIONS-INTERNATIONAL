import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { IActionButton } from 'src/app/components/layout/action-button/action-button.component';
import { IBrand } from 'src/app/model/brand.model';
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
export class AdminProductAddComponent implements OnInit, AfterViewInit {

    FormProduct: FormGroup;

    FormProductState: 'insert' | 'update' = 'insert';

    ActionButton: IActionButton[] = [];

    Kategori: IKategori[] = [];

    Brand: IBrand[] = [];

    Jenis: IJenis[] = [];

    SelectedFoto: any;

    SelectedBrochure: any;

    SelectedProduct!: IProduct;

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
            id_brand: [0, [Validators.required]],
            brand: ['', [Validators.required]],
            id_jenis: [0, [Validators.required]],
            jenis: ['', [Validators.required]],
            id_product: ['', [Validators.required]],
            product: ['', [Validators.required]],
            keterangan: ['', [Validators.required]],
            harga: [0, [Validators.required]],
            is_active: [true, [Validators.required]],
            path_foto: ["", [Validators.required]],
            path_brochure: ["", [Validators.required]],
        });

        this.ActionButton = [
            { id: 'back', title: 'Back', icon: 'fas fa-chevron-left fa-sm' },
            { id: 'save', title: 'Simpan', icon: 'fas fa-save fa-sm' },
        ];
    }

    ngOnInit(): void {
        this.getKategori();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            if (this.activatedRoute.snapshot.params.id) {
                this.getByIdProduct();
            };
        }, 100);
    }

    getByIdProduct(): void {
        this.dashboardService.getProductById(this.activatedRoute.snapshot.params.id)
            .subscribe((result) => {
                this.FormProductState = 'update';

                this.SelectedProduct = result;

                this.id_kategori.setValue(result.id_kategori);
                this.kategori.setValue(result.kategori);

                const kategoriDropdown = document.getElementById("kategoriDropdown") as HTMLSelectElement;
                kategoriDropdown.value = this.id_kategori.value;

                this.id_brand.setValue(result.id_brand);
                this.brand.setValue(result.brand);

                const brandDropdown = document.getElementById("brandDropdown") as HTMLSelectElement;
                brandDropdown.value = this.id_brand.value;

                this.id_jenis.setValue(result.id_jenis);
                this.jenis.setValue(result.jenis);

                const jenisDropdown = document.getElementById("jenisDropdown") as HTMLSelectElement;
                jenisDropdown.value = this.id_jenis.value;

                this.id_product.setValue(this.activatedRoute.snapshot.params.id);
                this.product.setValue(result.product);
                this.keterangan.setValue(result.keterangan);
                this.harga.setValue(result.harga);
                this.is_active.setValue(result.is_active);
                this.path_foto.setValue(result.path_foto);
                this.path_brochure.setValue(result.path_brochure);

                this.ActionButton = [
                    { id: 'back', title: 'Back', icon: 'fas fa-chevron-left fa-sm' },
                    { id: 'update', title: 'Update', icon: 'fas fa-save fa-sm' },
                ];
            });
    }

    getKategori(): void {
        this.dashboardService.getKategori()
            .subscribe((result) => {
                this.Kategori = result;
            });

        this.dashboardService.getBrand()
            .subscribe((result) => {
                this.Brand = result;
            });

        this.dashboardService.getJenis()
            .subscribe((result) => {
                this.Jenis = result;
            });
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
        this.id_kategori.setValue(args.target.selectedOptions[0].value);
        this.kategori.setValue(args.target.selectedOptions[0].text);

        this.dashboardService.getBrand()
            .pipe(
                map((result) => {
                    return result.filter(item => item.id_kategori == this.id_kategori.value);
                })
            )
            .subscribe((result) => {
                this.Brand = result;
            });
    }

    handleChangeBrand(args: any): void {
        this.id_brand.setValue(args.target.selectedOptions[0].value);
        this.brand.setValue(args.target.selectedOptions[0].text);

        this.dashboardService.getJenis()
            .pipe(
                map((result) => {
                    return result.filter(item => item.id_brand == this.id_brand.value);
                })
            )
            .subscribe((result) => {
                this.Jenis = result;
            });
    }

    handleChangeJenis(args: any): void {
        this.id_jenis.setValue(args.target.selectedOptions[0].value);
        this.jenis.setValue(args.target.selectedOptions[0].text);
    }

    handleChangeFoto(args: any): void {
        this.SelectedFoto = args.target.files;
    }

    handleChangeBrochure(args: any): void {
        this.SelectedBrochure = args.target.files;
    }

    handleSubmitProduct(data: any): void {
        const file = this.SelectedFoto.item(0);
        const newFile = new FileUpload(file);

        const filePath = `product/${newFile.file.name}`;
        const storageRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, newFile.file);

        this.utilityService.showLoader();

        // ** Upload Foto
        uploadTask.snapshotChanges()
            .pipe(
                finalize(() => {
                    storageRef.getDownloadURL()
                        .subscribe(url => {
                            data.path_foto = url;

                            const fileBrochure = this.SelectedBrochure.item(0);
                            const newFileBrochure = new FileUpload(fileBrochure);

                            const fileBrochurePath = `product_brochure/${newFileBrochure.file.name}`;
                            const storageBrochureRef = this.storage.ref(fileBrochurePath);
                            const uploadBrochureTask = this.storage.upload(fileBrochurePath, newFileBrochure.file);


                            // ** Upload Brochure
                            uploadBrochureTask.snapshotChanges()
                                .pipe(
                                    finalize(() => {
                                        storageBrochureRef.getDownloadURL()
                                            .subscribe(url => {
                                                data.path_brochure = url;

                                                // ** Insert Data to Database
                                                this.dashboardService.saveProduct(data)
                                                    .subscribe((result) => {
                                                        if (result) {
                                                            this.utilityService.closeLoader();

                                                            this.utilityService.showCustomAlert('success', 'Success', 'Data Berhasil Disimpan')
                                                                .then(() => {
                                                                    this.resetForm();
                                                                })
                                                        }
                                                    })
                                            })
                                    })
                                ).subscribe((result) => {

                                })
                        })
                })
            ).subscribe((result) => {
                console.log(result);
            });
    }

    handleUpdateProduct(data: any): void {
        if (this.SelectedFoto && !this.SelectedBrochure) {
            const file = this.SelectedFoto.item(0);
            const newFile = new FileUpload(file);

            const filePath = `product/${newFile.file.name}`;
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

                                        // ** Insert Data to Database
                                        this.dashboardService.updateProduct(data)
                                            .subscribe((result) => {
                                                if (result) {
                                                    this.utilityService.closeLoader();

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
                })
        }

        if (this.SelectedBrochure && !this.SelectedFoto) {
            const fileBrochure = this.SelectedBrochure.item(0);
            const newFileBrochure = new FileUpload(fileBrochure);

            const fileBrochurePath = `product_brochure/${newFileBrochure.file.name}`;
            const storageBrochureRef = this.storage.ref(fileBrochurePath);
            const uploadBrochureTask = this.storage.upload(fileBrochurePath, newFileBrochure.file);

            // ** Upload Brochure
            this.storage.storage.refFromURL(data.path_brochure).delete()
                .then(() => {
                    uploadBrochureTask.snapshotChanges()
                        .pipe(
                            finalize(() => {
                                storageBrochureRef.getDownloadURL()
                                    .subscribe(url => {
                                        data.path_brochure = url;

                                        // ** Insert Data to Database
                                        this.dashboardService.updateProduct(data)
                                            .subscribe((result) => {
                                                if (result) {
                                                    this.utilityService.closeLoader();

                                                    this.utilityService.showCustomAlert('success', 'Success', 'Data Berhasil Diupdate')
                                                        .then(() => {
                                                            this.resetForm();
                                                        })
                                                }
                                            })
                                    })
                            })
                        ).subscribe((result) => {

                        })
                })
        }

        if (this.SelectedFoto && this.SelectedBrochure) {
            const file = this.SelectedFoto.item(0);
            const newFile = new FileUpload(file);

            const filePath = `product/${newFile.file.name}`;
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

                                        const fileBrochure = this.SelectedBrochure.item(0);
                                        const newFileBrochure = new FileUpload(fileBrochure);

                                        const fileBrochurePath = `product_brochure/${newFileBrochure.file.name}`;
                                        const storageBrochureRef = this.storage.ref(fileBrochurePath);
                                        const uploadBrochureTask = this.storage.upload(fileBrochurePath, newFileBrochure.file);

                                        // ** Upload Brochure
                                        this.storage.storage.refFromURL(data.path_brochure).delete()
                                            .then(() => {
                                                uploadBrochureTask.snapshotChanges()
                                                    .pipe(
                                                        finalize(() => {
                                                            storageBrochureRef.getDownloadURL()
                                                                .subscribe(url => {
                                                                    data.path_brochure = url;

                                                                    // ** Insert Data to Database
                                                                    this.dashboardService.updateProduct(data)
                                                                        .subscribe((result) => {
                                                                            if (result) {
                                                                                this.utilityService.closeLoader();

                                                                                this.utilityService.showCustomAlert('success', 'Success', 'Data Berhasil Diupdate')
                                                                                    .then(() => {
                                                                                        this.resetForm();
                                                                                    })
                                                                            }
                                                                        })
                                                                })
                                                        })
                                                    ).subscribe((result) => {

                                                    })
                                            })
                                    })
                            })
                        ).subscribe((result) => {
                            // console.log(result);
                        });
                })
        }

        if (!this.SelectedFoto || !this.SelectedBrochure) {
            this.utilityService.showLoader();

            data.path_foto = this.SelectedProduct.path_foto;
            data.path_brochure = this.SelectedBrochure.path_brochure;

            this.dashboardService.updateProduct(data)
                .subscribe((result) => {
                    if (result) {
                        this.utilityService.closeLoader();

                        this.utilityService.showCustomAlert('success', 'Success', 'Data Berhasil Diupdate')
                            .then(() => {
                                this.resetForm();
                            })
                    }
                })
        }
    }

    handleOpenFotoProduct(data: IProduct): void {
        window.open(data.path_foto);
    }

    handleOpenBrochure(data: IProduct): void {
        window.open(data.path_brochure);
    }

    resetForm(): void {
        this.FormProduct.reset();
        this.id_kategori.setValue("");
        this.kategori.setValue("");
        this.id_brand.setValue("");
        this.brand.setValue("");
        this.id_jenis.setValue("");
        this.jenis.setValue("");
        this.id_product.setValue("");
        this.product.setValue("");
        this.keterangan.setValue("");
        this.harga.setValue(0);
        this.is_active.setValue(true);
        this.path_foto.setValue("");
        this.path_brochure.setValue("");

        if (this.FormProductState == 'update') {
            this.getByIdProduct();
        }
    }

    get id_kategori(): AbstractControl { return this.FormProduct.get('id_kategori') as AbstractControl }
    get kategori(): AbstractControl { return this.FormProduct.get('kategori') as AbstractControl }
    get id_brand(): AbstractControl { return this.FormProduct.get('id_brand') as AbstractControl }
    get brand(): AbstractControl { return this.FormProduct.get('brand') as AbstractControl }
    get id_jenis(): AbstractControl { return this.FormProduct.get('id_jenis') as AbstractControl }
    get jenis(): AbstractControl { return this.FormProduct.get('jenis') as AbstractControl }
    get id_product(): AbstractControl { return this.FormProduct.get('id_product') as AbstractControl }
    get product(): AbstractControl { return this.FormProduct.get('product') as AbstractControl }
    get keterangan(): AbstractControl { return this.FormProduct.get('keterangan') as AbstractControl }
    get harga(): AbstractControl { return this.FormProduct.get('harga') as AbstractControl }
    get is_active(): AbstractControl { return this.FormProduct.get('is_active') as AbstractControl }
    get path_foto(): AbstractControl { return this.FormProduct.get('path_foto') as AbstractControl }
    get path_brochure(): AbstractControl { return this.FormProduct.get('path_brochure') as AbstractControl }
}
