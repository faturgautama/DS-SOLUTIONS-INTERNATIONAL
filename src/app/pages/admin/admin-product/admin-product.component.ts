import { Component, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IJenis } from 'src/app/model/jenis.model';
import { IKategori } from 'src/app/model/kategori.model';
import { IProduct } from 'src/app/model/product.model';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
    selector: 'app-admin-product',
    templateUrl: './admin-product.component.html',
    styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {

    Kategori: IKategori[] = [];
    SelectedKategori!: IKategori;

    Jenis: IJenis[] = [];
    SelectedJenis!: IJenis;
    JenisModalRef?: BsModalRef;
    FormJenis: FormGroup;

    Product: IProduct[] = [];
    SelectedProduct!: IProduct;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private bsModalService: BsModalService,
        private utilityService: UtilityService,
        private dashboardService: DashboardService,
    ) {
        this.FormJenis = this.formBuilder.group({
            id_kategori: [0, [Validators.required]],
            id_jenis: ["", [Validators.required]],
            jenis: ["", [Validators.required]],
        })
    }

    ngOnInit(): void {
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

        this.dashboardService.getJenis(data.id_kategori)
            .subscribe((result) => {
                this.Jenis = result;
            });
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

    selectedJenis(data: IJenis): void {
        this.SelectedJenis = data;
        this.changeClassActiveJenis(this.SelectedJenis);
        this.getProductByIdJenis(this.SelectedJenis.id_jenis);
    }

    changeClassActiveJenis(data: IJenis): void {
        this.Jenis.forEach((item) => {
            if (item.id_jenis !== data.id_jenis) {
                const otherEl = document.getElementById(`${item.id_jenis}_list_item_jenis`) as HTMLElement;
                otherEl.classList.contains('active') ? otherEl.classList.remove('active') : null;
            } else {
                const el = document.getElementById(`${data.id_jenis}_list_item_jenis`) as HTMLElement;
                el.classList.add('active');
            }
        });
    }

    handleOpenModalJenis(template: TemplateRef<any>): void {
        this.JenisModalRef =
            this.bsModalService.show(
                template, Object.assign({}, {
                    class: 'modal-dialog-centered',
                })
            )
    }

    submitJenis(data: any): void {
        const body = {
            id_kategori: data.id_kategori,
            jenis: data.jenis,
        };

        this.dashboardService.saveJenis(body)
            .subscribe((result) => {
                if (result) {
                    this.utilityService.showCustomAlert('success', 'Success', 'Data Berhasil Disimpan')
                        .then(() => {
                            this.FormJenis.reset();
                            this.id_kategori.setValue(0);
                            this.jenis.setValue("");
                            this.bsModalService.hide();
                        })
                }
            })
    }

    getProductByIdJenis(id_jenis: string): void {
        this.dashboardService.getProduct()
            .pipe(
                map((result: IProduct[]) => {
                    return result.filter(item => item.id_jenis === id_jenis);
                })
            )
            .subscribe((result) => {
                this.Product = result;
            })
    }

    selectedProduct(data: IProduct): void {
        this.SelectedProduct = data;
        this.changeClassActiveProduct(this.SelectedProduct);
    }

    changeClassActiveProduct(data: IProduct): void {
        this.Product.forEach((item) => {
            if (item.id_product !== data.id_product) {
                const otherEl = document.getElementById(`${item.id_product}_list_item_product`) as HTMLElement;
                otherEl.classList.contains('active') ? otherEl.classList.remove('active') : null;

                const otherBadge = document.getElementById(`${item.id_product}_badge_item_product`) as HTMLElement;
                otherBadge.hidden = true;
            } else {
                const el = document.getElementById(`${data.id_product}_list_item_product`) as HTMLElement;
                el.classList.add('active');

                const badge = document.getElementById(`${data.id_product}_badge_item_product`) as HTMLElement;
                badge.hidden = false;
            }
        });
    }

    navigateToAddProduct(): void {
        this.router.navigateByUrl('dashboard/product/add');
    }

    navigateToDetailProduct(data: IProduct): void {
        this.router.navigate(['dashboard/product/detail', data.id_product]);
    }

    get id_kategori(): AbstractControl { return this.FormJenis.get('id_kategori') as AbstractControl }
    get jenis(): AbstractControl { return this.FormJenis.get('jenis') as AbstractControl }
}
