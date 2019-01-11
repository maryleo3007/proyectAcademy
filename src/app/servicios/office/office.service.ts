import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//models
import { OfficeModel} from '../../models/office.model';

@Injectable()
export class OfficeService {
  
  constructor(private _httpClient: HttpClient) {     
    
  }
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getOffice(): Observable<any> {
    return this._httpClient.get('https://brp36v4wvi.execute-api.us-east-1.amazonaws.com/Prod/api/v1/branch/office').pipe(
      map(this.extractData));
  }

}

