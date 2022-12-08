import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailProductComponent } from './components/section/detail-product/detail-product.component';
import { SectionBrandProductComponent } from './components/section/section-brand-product/section-brand-product.component';
import { SectionJenisProductComponent } from './components/section/section-jenis-product/section-jenis-product.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AdminCareerAddComponent } from './pages/admin/admin-career/admin-career-add/admin-career-add.component';
import { AdminCareerComponent } from './pages/admin/admin-career/admin-career.component';
import { AdminEventAddComponent } from './pages/admin/admin-event/admin-event-add/admin-event-add.component';
import { AdminEventComponent } from './pages/admin/admin-event/admin-event.component';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { AdminMessageComponent } from './pages/admin/admin-message/admin-message.component';
import { AdminProductAddComponent } from './pages/admin/admin-product/admin-product-add/admin-product-add.component';
import { AdminProductBrandComponent } from './pages/admin/admin-product/admin-product-brand/admin-product-brand.component';
import { AdminProductJenisComponent } from './pages/admin/admin-product/admin-product-jenis/admin-product-jenis.component';
import { AdminProductKategoriComponent } from './pages/admin/admin-product/admin-product-kategori/admin-product-kategori.component';
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
    { path: "brand-per-kategori/:id", component: SectionBrandProductComponent, data: { title: 'List Brand per Kategori' } },
    { path: "jenis-per-brand/:id", component: SectionJenisProductComponent, data: { title: 'List Jenis per Brand' } },
    { path: "product-per-jenis/:id", component: ListProductByKategoriComponent, data: { title: 'List Product per Jenis' } },
    { path: "product/:id", component: DetailProductComponent, data: { title: 'Detail Product' } },
    { path: "event", component: EventComponent, data: { title: 'Event' } },
    { path: "about-us", component: AboutUsComponent, data: { title: 'About Us' } },
    { path: "contact", component: ContactComponent, data: { title: 'Contact' } },
    { path: "career", component: CareerComponent, data: { title: 'Career' } },
    { path: "login", component: AuthenticationComponent, data: { title: 'Login' } },
    {
        path: "dashboard", children: [
            { path: 'home', component: AdminHomeComponent, data: { title: 'Dashboard Home' } },
            {
                path: 'setup-data', children: [
                    { path: 'setup-kategori-product', component: AdminProductKategoriComponent, data: { title: 'Setup Kategori Product' } },
                    { path: 'setup-brand', component: AdminProductBrandComponent, data: { title: 'Setup Brand' } },
                    { path: 'setup-jenis-product', component: AdminProductJenisComponent, data: { title: 'Setup Jenis Product' } },
                ]
            },
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
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
