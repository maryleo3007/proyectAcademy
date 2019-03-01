import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class AcademiService {

    constructor(private http: HttpClient) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'authkey',
                'userid': '1'
            })
        };
    }

    // private api = 'https://pbem4cq4f1.execute-api.us-east-1.amazonaws.com/Prod/api/v1/examen?studentId=442&examTypeId=1&examDateIni=2019-02-27&examDateFin=2019-02-28'
    private api2 = 'https://pbem4cq4f1.execute-api.us-east-1.amazonaws.com/Prod/api/v1'

    // public geListaEstados(): Observable<any[]> {
    //     return this.http.get<any[]>(this.api + '/catalogue/1');
    // }
    // public geListaTipos(): Observable<any[]> {
    //     return this.http.get<any[]>(this.api + '/catalogue/2');
    // }
    public geListaCursosxFechas(idEstuden: number = 442, tipeExamen: number = 1, dateInit, dateFin): Observable<any[]> {
        return this.http.get<any[]>(this.api2 + `/examen?studentId=${idEstuden}&examTypeId=${tipeExamen}&examDateIni=${dateInit}&examDateFin=${dateFin}`);
    }
    // public geListaExamenes(): Observable<any[]> {
    //     return this.http.get<any[]>(this.api2 + '/examen');
    // }
    public getExamenesxId(id: any = 2): Observable<any[]> {
        return this.http.get<any[]>(this.api2 + `/examen/${id}`);
    }

}
