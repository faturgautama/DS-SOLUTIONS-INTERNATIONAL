import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AdminCareerAddComponent } from './pages/admin/admin-career/admin-career-add/admin-career-add.component';
import { AdminCareerComponent } from './pages/admin/admin-career/admin-career.component';
import { AdminEventAddComponent } from './pages/admin/admin-event/admin-event-add/admin-event-add.component';
import { AdminEventComponent } from './pages/admin/admin-event/admin-event.component';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { AdminMessageComponent } from './pages/admin/admin-message/admin-message.component';
import { AdminProductAddComponent } from './pages/admin/admin-product/admin-product-add/admin-product-add.component';
import { AdminProductComponent } from './pages/admin/admin-product/admin-product.component';
import { AuthenticationComponent } from './pages/admin/authentication/authentication.component';
import { BerandaComponent } from './pages/beranda/beranda.component';
import { CareerComponent } from './pages/career/career.component';
import { ContactComponent } from './pages/contact/contact.component';
import { EventComponent } from './pages/event/event.component';
import { ListProductByKategoriComponent } from './pages/list-product-by-kategori/list-product-by-kategori.component';
import { ProductComponent } from './pages/product/product.component';

const routes: Routes = [
    { path: "", component: BerandaComponent, data: { title: 'Beranda' } },
    { path: "product", component: ProductComponent, data: { title: 'Product' } },
    { path: "product-per-kategori/:id", component: ListProductByKategoriComponent, data: { title: 'List Product' } },
    { path: "event", component: EventComponent, data: { title: 'Event' } },
    { path: "about-us", component: AboutUsComponent, data: { title: 'About Us' } },
    { path: "contact", component: ContactComponent, data: { title: 'Contact' } },
    { path: "career", component: CareerComponent, data: { title: 'Career' } },
    { path: "login", component: AuthenticationComponent, data: { title: 'Login' } },
    {
        path: "dashboard", children: [
            { path: 'home', component: AdminHomeComponent, data: { title: 'Dashboard Home' } },
            { path: 'product', component: AdminProductComponent, data: { title: 'Product' } },
            { path: 'product/add', component: AdminProductAddComponent, data: { title: 'Add Product' } },
            { path: 'product/detail/:id', component: AdminProductAddComponent, data: { title: 'Detail Product' } },
            { path: 'event', component: AdminEventComponent, data: { title: 'Event' } },
            { path: 'event/add', component: AdminEventAddComponent, data: { title: 'Add Event' } },
            { path: 'event/detail/:id', component: AdminEventAddComponent, data: { title: 'Detail Event' } },
            { path: 'message', component: AdminMessageComponent, data: { title: 'Message' } },
            { path: 'career', component: AdminCareerComponent, data: { title: 'Career' } },
            { path: 'career/add', component: AdminCareerAddComponent, data: { title: 'Add Career' } },
            { path: 'career/detail/:id', component: AdminCareerAddComponent, data: { title: 'Detail Career' } },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true, scrollPositionRestoration: 'enabled' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
