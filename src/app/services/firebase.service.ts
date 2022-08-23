import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { UtilityService } from './utility.service';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

    constructor(
        private router: Router,
        private httpClient: HttpClient,
        private cookieService: CookieService,
        private utilityService: UtilityService,
    ) { }

    getRequest(url: string): Observable<any> {
        return this.httpClient.get(url)
            .pipe(
                catchError((error: HttpErrorResponse): any => {
                    this.handlingError(error);
                })
            );
    }

    postRequest(url: string, data: any): Observable<any> {
        return this.httpClient.post(url, data)
            .pipe(
                catchError((error: HttpErrorResponse): any => {
                    this.handlingError(error);
                })
            );
    }

    patchRequest(url: string, data: any): Observable<any> {
        return this.httpClient.patch(url, data)
            .pipe(
                catchError((error: HttpErrorResponse): any => {
                    this.handlingError(error);
                })
            );
    }

    private handlingError(error: HttpErrorResponse) {
        if (error?.error.error == "Auth token is expired") {
            this.utilityService.showCustomAlert('warning', 'Oops', 'Session Habis, Mohon Login Ulang')
                .then(() => {
                    this.cookieService.deleteAll();
                    this.router.navigateByUrl("");
                });
        }

        throw error;
    }
}
