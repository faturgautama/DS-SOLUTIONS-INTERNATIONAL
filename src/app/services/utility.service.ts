import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class UtilityService {

    constructor() { }

    showLoader(): void {
        Swal.showLoading();
    }

    closeLoader(): void {
        Swal.close();
    }

    showCustomAlert(icon: any, title: string, message: string): Promise<any> {
        return Swal.fire({
            icon: icon,
            title: title,
            text: message,
            showCancelButton: false,
        });
    }
}
