import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthService } from "../services/auth.service";

@Injectable()
export class FirebaseTokenInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService,
        private cookieService: CookieService,
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const IsUserLogin = this.cookieService.check('UserData');

        if (IsUserLogin && (req.url.startsWith(environment.firebaseConfig.databaseURL) || req.url.includes(environment.firebaseConfig.storageBucket))) {
            const modifiedRequest = req.clone({
                setParams: {
                    auth: `${this.authService.getUserData().idToken}`
                }
            });

            return next.handle(modifiedRequest);
        } else {
            return next.handle(req);
        }
    }
}