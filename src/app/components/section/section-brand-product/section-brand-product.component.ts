import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBrand } from 'src/app/model/brand.model';
import { IKategori } from 'src/app/model/kategori.model';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
    selector: 'app-section-brand-product',
    templateUrl: './section-brand-product.component.html',
    styleUrls: ['./section-brand-product.component.css']
})
export class SectionBrandProductComponent implements OnInit, AfterViewInit {

    DetailKategori: IKategori = null as any;

    Brand: IBrand[] = [];

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

            this.dashboardService.getKategoriById(id)
                .subscribe((result) => {
                    if (result) {
                        this.DetailKategori = result as any;
                    }
                });

            this.getBrand(id);

            this.utilityService.closeLoader();
        }, 100);
    }

    getBrand(id_kategori: string): void {
        this.dashboardService.getBrandByIdKategori(id_kategori)
            .subscribe((result) => {
                if (result) {
                    this.Brand = result;
                }
            });
    }

    handleClickBrand(data: IBrand): void {
        this.router.navigate(['jenis-per-brand', data.id_brand]);
    }
}
