import { Component, OnInit } from '@angular/core';
import { ICareer } from 'src/app/model/career.model';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
    selector: 'app-career',
    templateUrl: './career.component.html',
    styleUrls: ['./career.component.css']
})
export class CareerComponent implements OnInit {

    Career: ICareer[] = [];

    constructor(
        private dashboardService: DashboardService
    ) { }

    ngOnInit(): void {
        this.dashboardService.getCareer()
            .subscribe((result) => {
                if (result) {
                    this.Career = result;
                }
            });
    }

    handleShowContent(item: ICareer): void {
        this.Career.forEach((career) => {
            if (item.id_career != career.id_career) {
                const otherEl = document.getElementById(`content_${item.id_career}`) as HTMLElement;
                otherEl.innerHTML = "";
            };
        });

        const el = document.getElementById(`content_${item.id_career}`) as HTMLElement;
        el.innerHTML = item.content;
    }
}
