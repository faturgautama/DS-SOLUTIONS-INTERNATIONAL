import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { CookieService } from 'ngx-cookie-service';
import { HtmlEditorService, ImageService, LinkService, RichTextEditorModule, ToolbarService } from '@syncfusion/ej2-angular-richtexteditor';

import { AppComponent } from './app.component';
import { BerandaComponent } from './pages/beranda/beranda.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { HeadingTypographComponent } from './components/typograph/heading-typograph/heading-typograph.component';
import { SubHeadingTypographComponent } from './components/typograph/sub-heading-typograph/sub-heading-typograph.component';
import { AuthenticationComponent } from './pages/admin/authentication/authentication.component';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { AdminDashboardComponent } from './components/layout/admin-dashboard/admin-dashboard.component';
import { LandingPageComponent } from './components/layout/landing-page/landing-page.component';
import { SectionCarouselComponent } from './components/section/section-carousel/section-carousel.component';
import { SectionWhoWeAreComponent } from './components/section/section-who-we-are/section-who-we-are.component';
import { SectionOurProductComponent } from './components/section/section-our-product/section-our-product.component';
import { CardProductComponent } from './components/card/card-product/card-product.component';
import { SectionOurPartnerComponent } from './components/section/section-our-partner/section-our-partner.component';
import { SectionJobOpportunityComponent } from './components/section/section-job-opportunity/section-job-opportunity.component';
import { FooterComponent } from './components/section/footer/footer.component';
import { SectionEventComponent } from './components/section/section-event/section-event.component';
import { ContactComponent } from './pages/contact/contact.component';
import { EventComponent } from './pages/event/event.component';
import { CareerComponent } from './pages/career/career.component';
import { CardEventComponent } from './components/card/card-event/card-event.component';
import { ProductComponent } from './pages/product/product.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ListProductByKategoriComponent } from './pages/list-product-by-kategori/list-product-by-kategori.component';
import { environment } from 'src/environments/environment';
import { AdminProductComponent } from './pages/admin/admin-product/admin-product.component';
import { FirebaseTokenInterceptor } from './helper/token.interceptor';
import { AdminProductAddComponent } from './pages/admin/admin-product/admin-product-add/admin-product-add.component';
import { ActionButtonComponent } from './components/layout/action-button/action-button.component';
import { AdminEventComponent } from './pages/admin/admin-event/admin-event.component';
import { AdminEventAddComponent } from './pages/admin/admin-event/admin-event-add/admin-event-add.component';
import { AdminMessageComponent } from './pages/admin/admin-message/admin-message.component';
import { AdminCareerComponent } from './pages/admin/admin-career/admin-career.component';
import { AdminCareerAddComponent } from './pages/admin/admin-career/admin-career-add/admin-career-add.component';

@NgModule({
    declarations: [
        AppComponent,
        BerandaComponent,
        NavbarComponent,
        HeadingTypographComponent,
        SubHeadingTypographComponent,
        FooterComponent,
        AuthenticationComponent,
        AdminHomeComponent,
        AdminDashboardComponent,
        LandingPageComponent,
        SectionCarouselComponent,
        SectionWhoWeAreComponent,
        SectionOurProductComponent,
        CardProductComponent,
        SectionOurPartnerComponent,
        SectionJobOpportunityComponent,
        SectionEventComponent,
        ContactComponent,
        EventComponent,
        CareerComponent,
        CardEventComponent,
        ProductComponent,
        AboutUsComponent,
        ListProductByKategoriComponent,
        AdminProductComponent,
        AdminProductAddComponent,
        ActionButtonComponent,
        AdminEventComponent,
        AdminEventAddComponent,
        AdminMessageComponent,
        AdminCareerComponent,
        AdminCareerAddComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ModalModule.forRoot(),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireStorageModule,
        RichTextEditorModule,
    ],
    providers: [
        ToolbarService,
        LinkService,
        ImageService,
        HtmlEditorService,
        CookieService,
        { provide: HTTP_INTERCEPTORS, useClass: FirebaseTokenInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
