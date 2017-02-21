import { Injectable } from '@angular/core'
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/map';
const API_URL = 'http://localhost:3000/api/v1/analyze';  // URL to web api

@Injectable()
export class DashboardService {
  headers:Headers

  constructor(private http: Http) {
      this.headers = new Headers({'Content-Type': 'application/json'});
  }
  
  getLogs() {
    return this.http.get(API_URL+'/logs', {headers: this.headers})
               .map(response => response.json())
  }
  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  

}
