import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { IBrand } from 'src/app/model/brand.model';
import { IJenis } from 'src/app/model/jenis.model';
import { IKategori } from 'src/app/model/kategori.model';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
    selector: 'app-admin-product-jenis',
    templateUrl: './admin-product-jenis.component.html',
    styleUrls: ['./admin-product-jenis.component.css']
})
export class AdminProductJenisComponent implements OnInit {

    Kategori: IKategori[] = [];

    Brand: IBrand[] = [];

    Jenis: IJenis[] = [];
    SelectedJenis: IJenis = null as any;

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
            id_jenis: ["", [Validators.required]],
            jenis: ["", [Validators.required]],
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
        this.dashboardService.getJenis()
            .subscribe((result) => {
                if (result) {
                    this.Jenis = result;
                };
            });
    }

    selectedJenis(data: IJenis): void {
        this.SelectedJenis = data;
        this.changeClassActiveKategori(this.SelectedJenis);
        this.id_kategori.setValue(data.id_kategori);
        this.kategori.setValue(data.kategori);

        const kategoriDropdown = document.getElementById("kategoriDropdown") as HTMLSelectElement;
        kategoriDropdown.value = this.id_kategori.value;

        this.dashboardService.getBrand()
            .subscribe((result) => {
                this.Brand = result;
            }, (error) => {

            }, () => {
                setTimeout(() => {
                    this.id_brand.setValue(data.id_brand);
                    this.brand.setValue(data.brand);

                    const brandDropdown = document.getElementById("brandDropdown") as HTMLSelectElement;
                    brandDropdown.value = this.id_brand.value;

                    console.log(brandDropdown.value);
                }, 2000);
            });

        this.id_jenis.setValue(data.id_jenis);
        this.jenis.setValue(data.jenis);
        this.FormState = 'edit';
    }

    changeClassActiveKategori(data: IJenis): void {
        this.Jenis.forEach((item) => {
            if (item.id_jenis !== data.id_jenis) {
                const otherEl = document.getElementById(`${item.id_jenis}_list_item`) as HTMLElement;
                otherEl.classList.contains('active') ? otherEl.classList.remove('active') : null;
            } else {
                const el = document.getElementById(`${data.id_jenis}_list_item`) as HTMLElement;
                el.classList.add('active');
            }
        });
    }

    handleChangeKategori(args: any): void {
        this.id_kategori.setValue(args.target.selectedOptions[0].value);
        this.kategori.setValue(args.target.selectedOptions[0].text);

        this.dashboardService.getBrand()
            .pipe(
                map((result) => {
                    return result.filter((item) => { return item.id_kategori == this.id_kategori.value });
                })
            )
            .subscribe((result) => {
                this.Brand = result;
            })
    }

    handleChangeBrand(args: any): void {
        this.id_brand.setValue(args.target.selectedOptions[0].value);
        this.brand.setValue(args.target.selectedOptions[0].text);
    }

    insert(data: IJenis): void {
        this.utilityService.showLoader();

        this.dashboardService.saveJenis(data)
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

    update(data: IJenis): void {
        this.dashboardService.updateJenis(data)
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

    delete(data: IJenis): void {
        this.utilityService.showLoader();

        this.dashboardService.deleteJenis(data.id_jenis)
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

        const brandDropdown = document.getElementById("brandDropdown") as HTMLSelectElement;
        brandDropdown.selectedIndex = 0;

        this.id_kategori.setValue("");
        this.kategori.setValue("");
        this.id_brand.setValue("");
        this.brand.setValue("");
        this.id_jenis.setValue("");
        this.jenis.setValue("");
        this.SelectedJenis = null as any;
        this.FormState = 'insert';
    }

    get id_kategori(): AbstractControl { return this.Form.get('id_kategori') as AbstractControl }
    get kategori(): AbstractControl { return this.Form.get('kategori') as AbstractControl }
    get id_brand(): AbstractControl { return this.Form.get('id_brand') as AbstractControl }
    get brand(): AbstractControl { return this.Form.get('brand') as AbstractControl }
    get id_jenis(): AbstractControl { return this.Form.get('id_jenis') as AbstractControl }
    get jenis(): AbstractControl { return this.Form.get('jenis') as AbstractControl }
}
