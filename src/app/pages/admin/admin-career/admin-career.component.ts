import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IActionButton } from 'src/app/components/layout/action-button/action-button.component';
import { ICareer } from 'src/app/model/career.model';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
    selector: 'app-admin-career',
    templateUrl: './admin-career.component.html',
    styleUrls: ['./admin-career.component.css']
})
export class AdminCareerComponent implements OnInit {

    ActionButton: IActionButton[] = [
        { id: 'add', title: 'Add', icon: 'fas fa-plus' }
    ];

    Career: ICareer[] = [];

    constructor(
        private router: Router,
        private dashboardService: DashboardService,
    ) {
        this.dashboardService.getCareer()
            .subscribe((result) => {
                if (result) {
                    this.Career = result;
                }
            })
    }

    ngOnInit(): void {
    }

    handleClickActionButton(data: IActionButton): void {
        switch (data.id) {
            case 'add':
                this.router.navigateByUrl('dashboard/career/add');
                break;
            default:
                break;
        }
    }

    handleClickDetail(data: ICareer): void {
        this.router.navigate(['dashboard/career/detail', data.id_career]);
    }

    handleShowContent(item: ICareer): void {
        this.Career.forEach((data) => {
            if (item.id_career !== data.id_career) {
                const otherEl = document.getElementById(`content_${item.id_career}`) as HTMLElement;
                otherEl.innerHTML = "";
            };
        });

        const el = document.getElementById(`content_${item.id_career}`) as HTMLElement;
        el.innerHTML = item.content;
    }

}
