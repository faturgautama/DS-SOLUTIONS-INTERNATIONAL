import { Component, OnInit } from '@angular/core';
import { url } from 'inspector';
import { IJenis } from 'src/app/model/jenis.model';
import { IKategori } from 'src/app/model/kategori.model';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Url } from 'url';
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
                this.Product = result.map((item) => {
                    return {
                        id_kategori: item.id_kategori,
                        kategori: item.kategori,
                        keterangan: item.keterangan,
                        path_foto: `url('${item.path_foto}')`
                    }
                });
            });
    }

    handleClickCardKategori(args: IKategori): void {
        console.log(args);
    }
}
