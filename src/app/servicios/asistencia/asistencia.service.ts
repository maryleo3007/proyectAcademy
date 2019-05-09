import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IdModel } from '../../models/persona.model';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class CalendarioService {
  constructor(private http: HttpClient) {

  }
  private api1 = 'https://77u1gf7xyj.execute-api.us-east-1.amazonaws.com/Prod/api/v1/calendar/2019';

  public getCalenadrio(): Observable<any[]> {
    return this.http.get<any[]>(this.api1);
  }

}
@Injectable()
export class SucursalService {
  constructor(private http: HttpClient) {
  }
  private api1 = 'https://77u1gf7xyj.execute-api.us-east-1.amazonaws.com/Prod/api/v1/branch/office';

  public getSucursales(): Observable<any[]> {
    return this.http.get<any[]>(this.api1);
  }

}
@Injectable()
export class AsistenciaListaService {
  objet1: IdModel;
  constructor(private http: HttpClient) {

  }
  private api1 = 'https://8qjrqts0i7.execute-api.us-east-1.amazonaws.com/Prod/api/v1/reporte/asistencia';
  private cambiar = 'https://8qjrqts0i7.execute-api.us-east-1.amazonaws.com/Prod/api/v1/reporte/asistencia/alumno?startDate=2019-05-05&endDate=2019-05-08&branchOffice=1';

  public getAsistenciaAlumno(inicio: any, fin: any, sucursal: any = 1): Observable<any[]> {
    // return this.http.get<any[]>(this.api1 + '/alumno?' + inicio + '&' + fin + '&branchOffice=1');
    console.log('inicio', inicio);
    console.log('fin', fin);
    return this.http.get<any[]>(this.cambiar);
  }

}
@Injectable()
export class AsistenciaRegistroService {
  constructor(private http: HttpClient) {
  }
  private api1 = 'https://8qjrqts0i7.execute-api.us-east-1.amazonaws.com/Prod/api/v1/asistencia/alumno';

  public getAsistenciaAlumno(documentNumber: any): Observable<any[]> {
    return this.http.post<any>(this.api1, JSON.stringify(documentNumber));
  }


}
