import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PersonaModel } from '../../models/persona.model';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class ProfesorService {

  constructor(private http: HttpClient) { }
  private api1 = 'https://haue79tb60.execute-api.us-east-1.amazonaws.com/Prod/api/v1/docente';

  public getPersonaProfesor(): Observable<PersonaModel[]> {
    return this.http.get<PersonaModel[]>(this.api1);
  }
  public deleteProfesor(id: number): void {
    this.http.post(this.api1 + '/delete', JSON.stringify(id));
  }
  /**
  //    * Metodo que valida campos obligatorios
  //    * @param  profesor
  //    */
  public saveOrUpdateProfesor(profesor: PersonaModel): Observable<any> {
    return this.http.post<any>(this.api1, JSON.stringify(profesor));
  }


}
