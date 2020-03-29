import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  showSuccessMesg(mesg?) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: mesg || 'Successfull',
      showConfirmButton: false,
      timer: 2500
    });
  }
  showErrorMesg( errmsg?) {

    Swal.fire({
      // position: 'top-end',
      icon: 'error',
      title: errmsg || 'Error',
      showConfirmButton: true,
      // timer: 1500
    });
  }
}

