import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAuth } from 'src/app/model/auth.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

    UserData: IAuth = this.authService.getUserData();

    SidebarMenu: any[] = [
        { id: "home", title: "Home", url: "dashboard/home" },
        { id: "product", title: "Product", url: "dashboard/product" },
        { id: "event", title: "Event", url: "dashboard/event" },
        { id: "message", title: "Message", url: "dashboard/message" },
        { id: "career", title: "Career", url: "dashboard/career" },
    ];

    constructor(
        private router: Router,
        private authService: AuthService,
    ) { }

    ngOnInit(): void {
    }

    handleClickSidebarItem(data: any): void {
        const el = document.getElementById(`${data.id}_a`) as HTMLElement;

        this.SidebarMenu.forEach((item) => {
            if (item.id != data.id) {
                const otherEl = document.getElementById(`${item.id}_a`) as HTMLElement;
                otherEl.classList.contains("active") ? otherEl.classList.remove("active") : null;
            }
        });

        setTimeout(() => {
            el.classList.contains("active") ? null : el.classList.add("active");
            this.router.navigateByUrl(data.url);
        }, 500);
    }

    handleCLickSignOut(): void {
        this.authService.signOut();
    }
}
