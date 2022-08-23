import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IActionButton } from 'src/app/components/layout/action-button/action-button.component';
import { IEvent } from 'src/app/model/event.model';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
    selector: 'app-admin-event',
    templateUrl: './admin-event.component.html',
    styleUrls: ['./admin-event.component.css']
})
export class AdminEventComponent implements OnInit {

    Event: Observable<IEvent[]>;

    ActionButton: IActionButton[] = [
        { id: 'add', title: 'Add', icon: 'fas fa-plus' }
    ];

    constructor(
        private router: Router,
        private dashboardService: DashboardService,
    ) {
        this.Event = this.dashboardService.getEvent();
    }

    ngOnInit(): void {
    }

    handleClickActionButton(data: IActionButton): void {
        switch (data.id) {
            case 'add':
                this.router.navigateByUrl('dashboard/event/add');
                break;
            default:
                break;
        }
    }

    viewEventDetail(data: IEvent): void {
        this.router.navigate(['dashboard/event/detail', data.id_event]);
    }
}
