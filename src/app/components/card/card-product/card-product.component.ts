import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface ICardProduct {
    id: string;
    title: string;
    content: string;
    image: string;
}

@Component({
    selector: 'app-card-product',
    templateUrl: './card-product.component.html',
    styleUrls: ['./card-product.component.css']
})
export class CardProductComponent implements OnInit {

    @Input('CardProduct') CardProduct: ICardProduct;

    @Output('clickedCardProduct') clickedCardProduct = new EventEmitter<ICardProduct>();

    constructor() {
        this.CardProduct = { id: "", title: "", content: "", image: "" }
    }

    ngOnInit(): void {
    }

    handleClickCardProduct(data: ICardProduct): void {
        this.clickedCardProduct.emit(data);
    }
}
