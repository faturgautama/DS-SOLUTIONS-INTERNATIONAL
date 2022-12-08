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
        {
            id: "setup-data", title: "Setup Data", url: "", child: [
                { id: 'setup-kategori-product', title: "Setup Kategori", url: "dashboard/setup-data/setup-kategori-product" },
                { id: 'setup-brand', title: "Setup Brand", url: "dashboard/setup-data/setup-brand" },
                { id: 'setup-jenis', title: "Setup Jenis Product", url: "dashboard/setup-data/setup-jenis-product" },
            ]
        },
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
        console.log(data)
        this.router.navigateByUrl(data.url);
    }

    handleCLickSignOut(): void {
        this.authService.signOut();
    }
}
