import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IEvent } from 'src/app/model/event.model';

export interface ICardEvent {
    id: string;
    title: string;
    content: string;
    image: string;
}

@Component({
    selector: 'app-card-event',
    templateUrl: './card-event.component.html',
    styleUrls: ['./card-event.component.css']
})
export class CardEventComponent implements OnInit {

    @Input('CardEvent') CardEvent: IEvent;

    @Output('clickedCardEvent') clickedCardEvent = new EventEmitter<IEvent>();

    constructor() {
        this.CardEvent = {
            id_event: "",
            judul: "",
            author: "",
            location: "",
            content: "",
            path_foto: "",
            time_created: new Date(),
            user_created: "",
        }
    }

    ngOnInit(): void {
    }

    handleClickCardProduct(data: IEvent): void {
        this.clickedCardEvent.emit(data);
    }
}
