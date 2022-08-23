import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { IAuth, SignIn } from '../model/auth.model';
import { FirebaseService } from './firebase.service';
import { UtilityService } from './utility.service';

const SIGN_IN_API = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseConfig.apiKey}`;

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private router: Router,
        private utilityService: UtilityService,
        private cookiesService: CookieService,
        private firebaseService: FirebaseService
    ) { }

    signIn(data: SignIn): Observable<any> {
        Swal.showLoading();

        return this.firebaseService.postRequest(SIGN_IN_API, data)
            .pipe(
                map((result) => {
                    if (result) {
                        Swal.close();
                        this.handlingAuth(data, result);
                    }
                    return result;
                })
            );
    }

    getUserData(): IAuth {
        return JSON.parse(this.cookiesService.get("UserData"));
    }

    reLogin(): void {
        const param = JSON.parse(this.cookiesService.get("Body"));

        this.firebaseService.postRequest(SIGN_IN_API, param)
            .subscribe((result) => {
                this.handlingAuth(param, result);
            });
    }

    signOut(): void {
        this.utilityService.showCustomAlert('success', 'Success', 'Sign Out Success')
            .then(() => {
                this.cookiesService.deleteAll();
                this.router.navigateByUrl("");
            })
    }

    private handlingAuth(body: SignIn, data: IAuth): void {
        this.utilityService.showCustomAlert('success', 'Success', 'Sign In Success')
            .then(() => {
                this.cookiesService.set("Body", JSON.stringify(body));
                this.cookiesService.set("UserData", JSON.stringify(data));
                this.router.navigateByUrl('dashboard/home');
            });
    }
}
