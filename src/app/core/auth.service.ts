import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable()
export class AuthService {
    
  constructor(private http: HttpClient,  public router: Router) { }
    
  api = 'https://bnku8lj8f6.execute-api.us-east-1.amazonaws.com/Prod/api/v1/login'

  attemptAuth(user: string, password: string): Observable<any> {
    const credentials = {user: user, password: password}; 
    return this.http.post(this.api, credentials, { headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})});   

}
}