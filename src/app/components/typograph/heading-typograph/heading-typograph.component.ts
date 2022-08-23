import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-heading-typograph',
    templateUrl: './heading-typograph.component.html',
    styleUrls: ['./heading-typograph.component.css']
})
export class HeadingTypographComponent implements OnInit {

    @Input('Heading') Heading: string = "Heading";

    constructor() { }

    ngOnInit(): void {
    }

}
