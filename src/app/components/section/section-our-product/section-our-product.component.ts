import { Component, OnInit } from '@angular/core';
import { IJenis } from 'src/app/model/jenis.model';
import { IKategori } from 'src/app/model/kategori.model';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ICardProduct } from '../../card/card-product/card-product.component';

@Component({
    selector: 'app-section-our-product',
    templateUrl: './section-our-product.component.html',
    styleUrls: ['./section-our-product.component.css']
})
export class SectionOurProductComponent implements OnInit {

    Product: IKategori[] = [];

    constructor(
        private dashboardService: DashboardService,
    ) { }

    ngOnInit(): void {
        this.dashboardService.getKategori()
            .subscribe((result) => {
                console.log(result);
                this.Product = result;
            })
    }

}
