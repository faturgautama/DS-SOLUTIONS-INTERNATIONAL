import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IBrand } from 'src/app/model/brand.model';
import { IJenis } from 'src/app/model/jenis.model';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
    selector: 'app-section-jenis-product',
    templateUrl: './section-jenis-product.component.html',
    styleUrls: ['./section-jenis-product.component.css']
})
export class SectionJenisProductComponent implements OnInit, AfterViewInit {

    DetailBrand: IBrand = null as any;

    Jenis: IJenis[] = [];

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
        setTimeout(() => {
            const id = this.activatedRoute.snapshot.params.id;

            this.dashboardService.getBrandById(id)
                .subscribe((result) => {
                    if (result) {
                        this.DetailBrand = result as any;
                    }
                });

            this.getJenis(id);

            this.utilityService.closeLoader();
        }, 100);
    }

    getJenis(id_brand: string): void {
        this.dashboardService.getJenisByIdBrand(id_brand)
            .subscribe((result) => {
                if (result) {
                    this.Jenis = result;
                }
            });
    }

    handleClickJenis(data: IJenis): void {
        this.router.navigate(['product-per-jenis', data.id_jenis]);
    }
}
