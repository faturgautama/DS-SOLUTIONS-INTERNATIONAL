import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBrand } from 'src/app/model/brand.model';
import { IKategori } from 'src/app/model/kategori.model';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
    selector: 'app-admin-product-brand',
    templateUrl: './admin-product-brand.component.html',
    styleUrls: ['./admin-product-brand.component.css']
})
export class AdminProductBrandComponent implements OnInit {

    Kategori: IKategori[] = [];

    Brand: IBrand[] = [];
    SelectedBrand: IBrand = null as any;

    Form: FormGroup;
    FormState: 'edit' | 'insert' = 'insert';

    constructor(
        private formBuilder: FormBuilder,
        private utilityService: UtilityService,
        private dashboardService: DashboardService,
    ) {
        this.Form = this.formBuilder.group({
            id_kategori: ["", [Validators.required]],
            kategori: ["", [Validators.required]],
            id_brand: ["", [Validators.required]],
            brand: ["", [Validators.required]],
            keterangan: ["", [Validators.required]],
        });
    }

    ngOnInit(): void {
        this.getAll();

        this.dashboardService.getKategori()
            .subscribe((result) => {
                if (result) {
                    this.Kategori = result;
                }
            })
    }

    getAll(): void {
        this.dashboardService.getBrand()
            .subscribe((result) => {
                if (result) {
                    this.Brand = result;
                };
            });
    }

    selectedBrand(data: IBrand): void {
        this.SelectedBrand = data;
        this.changeClassActiveKategori(this.SelectedBrand);
        this.id_kategori.setValue(data.id_kategori);

        const kategoriDropdown = document.getElementById("kategoriDropdown") as HTMLSelectElement;
        kategoriDropdown.value = this.id_kategori.value;

        this.kategori.setValue(data.kategori);
        this.id_brand.setValue(data.id_brand);
        this.brand.setValue(data.brand);
        this.keterangan.setValue(data.keterangan);
        this.FormState = 'edit';
    }

    changeClassActiveKategori(data: IBrand): void {
        this.Brand.forEach((item) => {
            if (item.id_brand !== data.id_brand) {
                const otherEl = document.getElementById(`${item.id_brand}_list_item`) as HTMLElement;
                otherEl.classList.contains('active') ? otherEl.classList.remove('active') : null;
            } else {
                const el = document.getElementById(`${data.id_brand}_list_item`) as HTMLElement;
                el.classList.add('active');
            }
        });
    }

    handleChangeKategori(args: any): void {
        this.id_kategori.setValue(args.target.selectedOptions[0].value);
        this.kategori.setValue(args.target.selectedOptions[0].text);
    }

    insert(data: IBrand): void {
        this.utilityService.showLoader();

        this.dashboardService.saveBrand(data)
            .subscribe((result) => {
                if (result) {
                    this.utilityService.closeLoader();

                    this.utilityService.showCustomAlert('success', 'Success', 'Data Berhasil Disimpan')
                        .then(() => {
                            this.resetForm();
                            this.getAll();
                        })
                }
            });
    }

    update(data: IBrand): void {
        this.dashboardService.updateBrand(data)
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

    delete(data: IBrand): void {
        this.utilityService.showLoader();

        this.dashboardService.deleteBrand(data.id_brand)
            .subscribe((result) => {
                this.utilityService.closeLoader();

                this.utilityService.showCustomAlert('success', 'Success', 'Data Berhasil Dihapus')
                    .then(() => {
                        this.resetForm();
                        this.getAll();
                    })
            })
    }

    resetForm(): void {
        this.Form.reset();

        const kategoriDropdown = document.getElementById("kategoriDropdown") as HTMLSelectElement;
        kategoriDropdown.selectedIndex = 0;

        this.id_kategori.setValue("");
        this.kategori.setValue("");
        this.id_brand.setValue("");
        this.brand.setValue("");
        this.keterangan.setValue("");
        this.SelectedBrand = null as any;
        this.FormState = 'insert';
    }

    get id_kategori(): AbstractControl { return this.Form.get('id_kategori') as AbstractControl }
    get kategori(): AbstractControl { return this.Form.get('kategori') as AbstractControl }
    get id_brand(): AbstractControl { return this.Form.get('id_brand') as AbstractControl }
    get brand(): AbstractControl { return this.Form.get('brand') as AbstractControl }
    get keterangan(): AbstractControl { return this.Form.get('keterangan') as AbstractControl }
}
