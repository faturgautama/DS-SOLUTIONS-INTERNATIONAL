import { Component, OnInit } from '@angular/core';
import { ICardProduct } from '../../card/card-product/card-product.component';

@Component({
    selector: 'app-section-our-product',
    templateUrl: './section-our-product.component.html',
    styleUrls: ['./section-our-product.component.css']
})
export class SectionOurProductComponent implements OnInit {

    Product: ICardProduct[];

    constructor() {
        this.Product = [
            { id: "1", title: "Laboratory Testing Equipments", image: "../../../../assets/image/tigran-kharatyan-ezX-4IMPP1s-unsplash.jpg", content: "" },
            { id: "2", title: "Manufacturing Machines", image: "../../../../assets/image/tigran-kharatyan-MvkpAOX329A-unsplash.jpg", content: "" },
            { id: "3", title: "Reefer Containers for Rental & Sale", image: "../../../../assets/image/tigran-kharatyan-ezX-4IMPP1s-unsplash.jpg", content: "" },
            { id: "4", title: "Ceramics Materials", image: "../../../../assets/image/tigran-kharatyan-MvkpAOX329A-unsplash.jpg", content: "" },
            { id: "5", title: "Dental Equipments and Materials", image: "../../../../assets/image/tigran-kharatyan-ezX-4IMPP1s-unsplash.jpg", content: "" },
        ]
    }

    ngOnInit(): void {
    }

}
