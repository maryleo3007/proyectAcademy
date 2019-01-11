import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersonaModel, IdModel } from '../../models/persona.model';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class AlumnoService {
  objet1: IdModel;  
  constructor(private http: HttpClient) {     
    
  }
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
  private api1 = 'https://mouqx57aif.execute-api.us-east-1.amazonaws.com/Prod/api/v1/alumno'
  
  public getPersonaAlumno(): Observable<PersonaModel[]> {
    return this.http.get<PersonaModel[]>(this.api1);
  }

  getStudents(): Observable<any> {
    return this.http.get(this.api1).pipe(
      map(this.extractData));
  }

  public deleteAlumno(id : any): Observable<any> {  
    return this.http.post<any>(this.api1+ '/delete', JSON.stringify(id));
  }
  /**
  //    * Metodo que valida campos obligatorios
  //    * @param  alumno
  //    */
  public saveOrUpdateAlumno(alumno: PersonaModel): Observable<any> {
    return this.http.post<any>(this.api1, JSON.stringify(alumno));
  }

}

