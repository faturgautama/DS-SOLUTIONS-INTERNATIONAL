import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/model/product.model';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
    selector: 'app-detail-product',
    templateUrl: './detail-product.component.html',
    styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {

    DetailProduct: IProduct = null as any;

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

        this.dashboardService.getProductById(id)
            .subscribe((result) => {
                if (result) {
                    this.utilityService.closeLoader();
                    this.DetailProduct = result as any;
                }
            });
    }

    handleClickBrochure(data: IProduct): void {
        window.open(data.path_brochure);
    }
}
