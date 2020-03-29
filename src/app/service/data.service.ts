import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get('assets/area.json');
  }
  getDataByPincode(pincode): Observable<any> {
    return this.http.get('https://api.postalpincode.in/pincode/' + pincode);


  }

  getDataFromGithub(): Observable<any> {
    return this.http.get('https://pomber.github.io/covid19/timeseries.json');
    // return this.http.get('   https://corona-status-live-api.herokuapp.com/api/data/Delhi%20(India)?date=2020-3-29');

  }
}
