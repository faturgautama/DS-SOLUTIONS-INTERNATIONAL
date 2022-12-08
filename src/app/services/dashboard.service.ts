import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IBrand } from '../model/brand.model';
import { ICareer } from '../model/career.model';
import { IEvent } from '../model/event.model';
import { IJenis } from '../model/jenis.model';
import { IKategori } from '../model/kategori.model';
import { IMessage } from '../model/message.model';
import { IProduct } from '../model/product.model';
import { AuthService } from './auth.service';
import { FirebaseService } from './firebase.service';

const KATEGORI_API = `${environment.firebaseConfig.databaseURL}/kategori.json`;
const BRAND_API = `${environment.firebaseConfig.databaseURL}/brand.json`;
const JENIS_API = `${environment.firebaseConfig.databaseURL}/jenis.json`;
const PRODUCT_API = `${environment.firebaseConfig.databaseURL}/product.json`;
const EVENT_API = `${environment.firebaseConfig.databaseURL}/event.json`;
const MESSAGE_API = `${environment.firebaseConfig.databaseURL}/message.json`;
const CAREER_API = `${environment.firebaseConfig.databaseURL}/career.json`;

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor(
        private authService: AuthService,
        private storage: AngularFireStorage,
        private firebaseService: FirebaseService,
    ) { }

    // ** Kategori ====
    getKategori(): Observable<IKategori[]> {
        return this.firebaseService.getRequest(KATEGORI_API)
            .pipe(
                map((result: IKategori[]) => {
                    let data = [];

                    for (const key in result) {
                        if (result.hasOwnProperty(key)) {
                            data.push({ ...result[key], id_kategori: key });
                        }
                    };

                    return data;
                })
            )
    }

    updateKategori(data: any): Observable<any> {
        return this.firebaseService.patchRequest(`${environment.firebaseConfig.databaseURL}/kategori/${data.id_kategori}.json`, data);
    }

    saveKategori(data: any): Observable<any> {
        return this.firebaseService.postRequest(KATEGORI_API, data);
    }

    deleteKategori(id_kategori: string): Observable<any> {
        return this.firebaseService.deleteRequest(`${environment.firebaseConfig.databaseURL}/kategori/${id_kategori}.json`);
    }

    // ** Brand === 
    getBrand(): Observable<IBrand[]> {
        return this.firebaseService.getRequest(BRAND_API)
            .pipe(
                map((result: IBrand[]) => {
                    let data = [];

                    for (const key in result) {
                        if (result.hasOwnProperty(key)) {
                            data.push({ ...result[key], id_brand: key });
                        }
                    };

                    return data;
                })
            )
    }

    updateBrand(data: IBrand): Observable<any> {
        return this.firebaseService.patchRequest(`${environment.firebaseConfig.databaseURL}/brand/${data.id_brand}.json`, data);
    }

    saveBrand(data: IBrand): Observable<any> {
        return this.firebaseService.postRequest(BRAND_API, data);
    }

    deleteBrand(id_brand: string): Observable<any> {
        return this.firebaseService.deleteRequest(`${environment.firebaseConfig.databaseURL}/brand/${id_brand}.json`);
    }

    // ** Jenis ====
    getJenis(): Observable<IJenis[]> {
        return this.firebaseService.getRequest(JENIS_API)
            .pipe(
                map((result: IJenis[]) => {
                    let data = [];

                    for (const key in result) {
                        if (result.hasOwnProperty(key)) {
                            data.push({ ...result[key], id_jenis: key });
                        }
                    };

                    return data;
                })
            )
    }

    saveJenis(data: any): Observable<any> {
        return this.firebaseService.postRequest(JENIS_API, data);
    }

    updateJenis(data: any): Observable<any> {
        return this.firebaseService.patchRequest(`${environment.firebaseConfig.databaseURL}/jenis/${data.id_jenis}.json`, data);
    }

    deleteJenis(id_jenis: string): Observable<any> {
        return this.firebaseService.deleteRequest(`${environment.firebaseConfig.databaseURL}/jenis/${id_jenis}.json`);
    }

    // ** Product ===
    getProduct(): Observable<IProduct[]> {
        return this.firebaseService.getRequest(PRODUCT_API)
            .pipe(
                map((result: { [key: string]: any }) => {
                    let data = [];

                    for (const key in result) {
                        if (result.hasOwnProperty(key)) {
                            data.push({ ...result[key], id_product: key });
                        }
                    };

                    return data;
                })
            )
    }

    getProductById(id_product: string): Observable<IProduct> {
        return this.firebaseService.getRequest(`${environment.firebaseConfig.databaseURL}/product/${id_product}.json`);
    }

    saveProduct(data: IProduct): Observable<any> {
        data.time_created = new Date();
        data.user_created = this.authService.getUserData().displayName;

        return this.firebaseService.postRequest(PRODUCT_API, data);
    }

    updateProduct(data: IProduct): Observable<any> {
        return this.firebaseService.patchRequest(`${environment.firebaseConfig.databaseURL}/product/${data.id_product}.json`, data);
    }

    // ** Event
    getEvent(): Observable<IEvent[]> {
        return this.firebaseService.getRequest(EVENT_API)
            .pipe(
                map((result: { [key: string]: any }) => {
                    let data = [];

                    for (const key in result) {
                        if (result.hasOwnProperty(key)) {
                            data.push({ ...result[key], id_event: key });
                        }
                    };

                    return data;
                })
            )
    }

    getEventById(id_event: string): Observable<IEvent> {
        return this.firebaseService.getRequest(`${environment.firebaseConfig.databaseURL}/event/${id_event}.json`);
    }

    saveEvent(data: IEvent): Observable<any> {
        data.time_created = new Date();
        data.user_created = this.authService.getUserData().displayName;

        return this.firebaseService.postRequest(EVENT_API, data);
    }

    updateEvent(data: IEvent): Observable<any> {
        return this.firebaseService.patchRequest(`${environment.firebaseConfig.databaseURL}/event/${data.id_event}.json`, data);
    }

    deleteEvent(id_event: string): Observable<any> {
        return this.firebaseService.deleteRequest(`${environment.firebaseConfig.databaseURL}/event/${id_event}.json`);
    }

    // ** Message
    saveMessage(data: IMessage): Observable<any> {
        data.date_created = new Date();
        return this.firebaseService.postRequest(MESSAGE_API, data);
    }

    getMessage(): Observable<any> {
        return this.firebaseService.getRequest(MESSAGE_API)
            .pipe(
                map((result: { [key: string]: any }) => {
                    let data = [];

                    for (const key in result) {
                        if (result.hasOwnProperty(key)) {
                            data.push({ ...result[key], id_message: key });
                        }
                    };

                    return data;
                })
            )
    }

    getMessageById(id_message: string): Observable<IEvent> {
        return this.firebaseService.getRequest(`${environment.firebaseConfig.databaseURL}/message/${id_message}.json`);
    }

    // ** Career
    getCareer(): Observable<ICareer[]> {
        return this.firebaseService.getRequest(CAREER_API)
            .pipe(
                map((result: { [key: string]: any }) => {
                    let data = [];

                    for (const key in result) {
                        if (result.hasOwnProperty(key)) {
                            data.push({ ...result[key], id_career: key });
                        }
                    };

                    return data;
                })
            )
    }

    getCareerById(id_message: string): Observable<ICareer> {
        return this.firebaseService.getRequest(`${environment.firebaseConfig.databaseURL}/career/${id_message}.json`);
    }

    saveCareer(data: ICareer): Observable<any> {
        data.time_created = new Date();
        data.user_created = this.authService.getUserData().displayName;
        return this.firebaseService.postRequest(CAREER_API, data);
    }

    updateCareer(data: ICareer): Observable<any> {
        return this.firebaseService.patchRequest(`${environment.firebaseConfig.databaseURL}/career/${data.id_career}.json`, data);
    }

    deleteCareer(id_career: string): Observable<any> {
        return this.firebaseService.deleteRequest(`${environment.firebaseConfig.databaseURL}/career/${id_career}.json`);
    }
}
