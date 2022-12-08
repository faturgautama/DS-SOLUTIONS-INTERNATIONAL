import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IJenis } from 'src/app/model/jenis.model';
import { IProduct } from 'src/app/model/product.model';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
    selector: 'app-list-product-by-kategori',
    templateUrl: './list-product-by-kategori.component.html',
    styleUrls: ['./list-product-by-kategori.component.css']
})
export class ListProductByKategoriComponent implements OnInit, AfterViewInit {

    DetailJenis: IJenis = null as any;

    Product: IProduct[] = [];

    constructor(
        private router: Router,
        private utilityService: UtilityService,
        private activatedRoute: ActivatedRoute,
        private dashboardService: DashboardService,
    ) { }

    ngOnInit(): void {
        this.utilityService.showLoader();
    }

    ngAfterViewInit(): void {
        const id = this.activatedRoute.snapshot.params.id;

        this.dashboardService.getJenisById(id)
            .subscribe((result) => {
                if (result) {
                    this.DetailJenis = result as any;
                }
            });

        this.getProduct(id);
    }

    getProduct(id_jenis: string): void {
        this.dashboardService.getProductByIdJenis(id_jenis)
            .subscribe((result) => {
                if (result) {
                    this.utilityService.closeLoader();

                    this.Product = result;
                }
            });
    }

    handleClickProduct(data: IProduct): void {
        this.router.navigate(['product', data.id_product]);
    }

    handleClickBrochure(data: IProduct): void {
        window.open(data.path_brochure);
    }
}
