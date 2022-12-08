import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IKategori } from 'src/app/model/kategori.model';

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

    @Input('CardProduct') CardProduct: IKategori;

    constructor(
        private router: Router,
    ) {
        this.CardProduct = { id_kategori: "", kategori: "", keterangan: "", path_foto: "" }
    }

    ngOnInit(): void {
    }

    handleClickCardProduct(data: IKategori): void {
        this.router.navigate(['brand-per-kategori', data.id_kategori]);
    }
}
