import { Component, Input, OnInit } from '@angular/core';
import { IEvent } from 'src/app/model/event.model';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
    selector: 'app-section-event',
    templateUrl: './section-event.component.html',
    styleUrls: ['./section-event.component.css']
})
export class SectionEventComponent implements OnInit {

    @Input('Datasource') Event: IEvent[] = [];

    constructor(
        private dashboardService: DashboardService
    ) {
        this.dashboardService.getEvent()
            .subscribe((result) => {
                this.Event = result;
            });
    }

    ngOnInit(): void {
    }

}
