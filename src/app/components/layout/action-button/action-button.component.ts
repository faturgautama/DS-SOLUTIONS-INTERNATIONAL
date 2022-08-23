import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export interface IActionButton {
    id: string;
    title: string;
    icon: string;
}

@Component({
    selector: 'app-action-button',
    templateUrl: './action-button.component.html',
    styleUrls: ['./action-button.component.css']
})
export class ActionButtonComponent implements OnInit {

    PageTitle: string = "";

    @Input('ActionButton') ActionButton: IActionButton[] = [];

    @Output('clickedActionButton') clickedActionButton = new EventEmitter<IActionButton>();

    constructor(
        private activatedRoute: ActivatedRoute,
    ) {
        this.PageTitle = this.activatedRoute.snapshot.data.title;
    }

    ngOnInit(): void {
    }

    handleClickActionButton(data: IActionButton): void {
        this.clickedActionButton.emit(data);
    }
}
