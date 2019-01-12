import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersonaModel, IdModel } from '../../models/persona.model';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class CalendarioService { 
  constructor(private http: HttpClient) {     
    
  }
    private api1 = 'https://brp36v4wvi.execute-api.us-east-1.amazonaws.com/Prod/api/v1/calendar/2019'
  
  public getCalenadrio(): Observable<any[]> {
    return this.http.get<any[]>(this.api1);
  }

}
@Injectable()
export class SucursalService {
  constructor(private http: HttpClient) {   
  }
    private api1 = 'https://brp36v4wvi.execute-api.us-east-1.amazonaws.com/Prod/api/v1/branch/office'
  
  public getSucursales(): Observable<any[]> {
    return this.http.get<any[]>(this.api1);
  }

}
@Injectable()
export class AsistenciaListaService {
    objet1: IdModel;  
    constructor(private http: HttpClient) {     
      
    }
      private api1 = 'https://ko7nkpddlg.execute-api.us-east-1.amazonaws.com/Prod/api/v1/reporte/asistencia'
    
    public getAsistenciaAlumno(inicio: any, fin : any, sucursal: any): Observable<any[]> {
      return this.http.get<any[]>(this.api1 + '/alumno?' + inicio +'&'+ fin + '&branchOffice='+ sucursal);
    }
  
  }
  @Injectable()
  export class AsistenciaRegistroService {  
    constructor(private http: HttpClient) {     
    }
      private api1 = 'https://ko7nkpddlg.execute-api.us-east-1.amazonaws.com/Prod/api/v1/asistencia/alumno'
    
    public getAsistenciaAlumno(documentNumber: any): Observable<any[]> {     
      return this.http.post<any>(this.api1, JSON.stringify(documentNumber));
    }  
  
  
  }
