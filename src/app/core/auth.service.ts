import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable()
export class AuthService {
    
  constructor(private http: HttpClient,  public router: Router) { }
    
  api = 'https://bnku8lj8f6.execute-api.us-east-1.amazonaws.com/Prod/api/v1/login'

  attemptAuth(user): Observable<any> {             
    return this.http.post(this.api, JSON.stringify(user));   

}
}
