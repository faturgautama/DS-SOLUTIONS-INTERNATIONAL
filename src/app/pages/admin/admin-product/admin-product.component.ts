import { formatCurrency, formatDate } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { map } from 'rxjs/operators';
import { GridComponent, GridAttribute } from 'src/app/components/grid/grid.component';
import { IActionButton } from 'src/app/components/layout/action-button/action-button.component';
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

    ActionButton: IActionButton[] = [
        { id: 'add', title: 'Add', icon: 'fas fa-plus' },
        { id: 'edit', title: 'Edit', icon: 'fas fa-edit' },
        { id: 'change_status', title: 'Change Status', icon: 'fas fa-sync-alt' }
    ];

    Product: IProduct[] = [];
    SelectedProduct!: IProduct;

    @ViewChild('GridComp') GridComp!: GridComponent;
    GridAttributes!: GridAttribute;
    GridSelectedData: any;

    constructor(
        private router: Router,
        private utilityService: UtilityService,
        private dashboardService: DashboardService,
    ) {
        this.GridAttributes = {
            column: [
                { field: 'id_kategori', headerName: 'ID KATEGORI', hide: true, },
                { field: 'kategori', headerName: 'KATEGORI', width: 100 },
                { field: 'id_brand', headerName: 'ID BRAND', hide: true },
                { field: 'brand', headerName: 'BRAND', },
                { field: 'id_jenis', headerName: 'ID JENIS', hide: true },
                { field: 'jenis', headerName: 'JENIS', },
                { field: 'id_product', headerName: 'ID PRODUCT', hide: true },
                { field: 'product', headerName: 'NAMA PRODUCT', },
                {
                    field: 'harga', headerName: 'HARGA',
                    cellRenderer: (data: any) => { return formatCurrency(data.value, 'EN', 'Rp. ') }
                },
                {
                    field: 'is_active', headerName: 'IS ACTIVE', headerClass: 'text-center', cellClass: 'text-center',
                    cellRenderer: (args: any) => {
                        if (args.value) {
                            return '<span><i class="fas fa-check fa-xs"></i></span>'
                        } else {
                            return '<span><i class="fas fa-times fa-xs"></i></span>'
                        }
                    },
                },
                {
                    field: 'time_created', headerName: 'WAKTU ENTRY',
                    cellRenderer: (data: any) => { return formatDate(data.value, 'dd/MM/yyyy HH:mm', 'EN') }
                },
                { field: 'user_created', headerName: 'USER ENTRY', },
            ],
            dataSource: []
        };
    }

    ngOnInit(): void {
        this.getProduct();
    }

    handleClickActionButton(data: IActionButton): void {
        switch (data.id) {
            case 'add':
                this.navigateToAddProduct();
                break;
            case 'edit':
                this.navigateToDetailProduct(this.SelectedProduct);
                break;
            case 'change_status':
                this.changeStatus(this.SelectedProduct);
                break;
            default:
                break;
        }
    }

    getProduct(): void {
        this.dashboardService.getProduct()
            .subscribe((result) => {
                this.GridAttributes.dataSource = result;
            })
    }

    handleSelectionChanged(args: any): void {
        this.SelectedProduct = args;
    }

    navigateToAddProduct(): void {
        this.router.navigateByUrl('dashboard/product/add');
    }

    navigateToDetailProduct(data: IProduct): void {
        this.router.navigate(['dashboard/product/detail', data.id_product]);
    }

    changeStatus(data: IProduct): void {
        data.is_active = !data.is_active as any;

        this.dashboardService.updateProduct(data)
            .subscribe((result) => {
                this.utilityService.showCustomAlert('success', 'Success', 'Data Berhasil Diupdate')
                    .then(() => {
                        this.getProduct();
                    })
            });
    }
}
