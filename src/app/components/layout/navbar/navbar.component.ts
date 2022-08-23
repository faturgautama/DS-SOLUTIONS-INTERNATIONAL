import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationComponent } from 'src/app/pages/admin/authentication/authentication.component';

export interface IMenu {
    id: string;
    title: string;
    url: string;
}

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    Menu: IMenu[];

    constructor(
        private router: Router,
    ) {
        this.Menu = [
            { id: 'home', title: "Home", url: "" },
            { id: 'product', title: "Product", url: "product" },
            { id: 'event', title: "Event", url: "event" },
            { id: 'about_us', title: "About Us", url: "about-us" },
            { id: 'contact', title: "Contact", url: "contact" },
            { id: 'careers', title: "Careers", url: "career" },
        ];
    }

    ngOnInit(): void {
    }

    handleChangeNavActive(menu: IMenu): void {
        this.Menu.forEach((item) => {
            if (item.id !== menu.id) {
                const otherEl = document.getElementById(`${item.id}`) as HTMLElement;
                if (otherEl.classList.contains('active')) {
                    otherEl.classList.remove('active');
                };
            }
        });

        const currentEl = document.getElementById(`${menu.id}`) as HTMLElement;
        currentEl.classList.add('active');

        this.router.navigateByUrl(menu.url);
    }

    handleClickSignIn(): void {
        const btnClickModalAuth = document.getElementById('btnClickModalAuth') as HTMLElement;
        btnClickModalAuth.click();
    }
}
