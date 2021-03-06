import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// import { map } from 'rxjs/operators';
@Injectable()
export class AcademiService {

    constructor(private http: HttpClient) {
    }

    private api = 'https://77u1gf7xyj.execute-api.us-east-1.amazonaws.com/Prod/api/v1';
    private api2 = 'https://6qrbzxo6q4.execute-api.us-east-1.amazonaws.com/Prod/api/v1';
    // private api3 = 'https://6qrbzxo6q4.execute-api.us-east-1.amazonaws.com/Prod/api/v1';


    public geListaTipos(): Observable<any[]> {
        return this.http.get<any[]>(this.api + '/catalogue/2');
    }
    public geListaCursosxFechas(idEstuden: number = 124, tipeExamen: number = 1, dateInit = '2019-05-01', dateFin = '2019-06-01'): Observable<any[]> {
        return this.http.get<any[]>(this.api2 + `/examen?studentId=${idEstuden}&examTypeId=${tipeExamen}&examDateIni=${dateInit}&examDateFin=${dateFin}`)
            .pipe(map((res: any) => {
                return res.data;
            }
            ));
    }

    public getExamenesxId(id: any = 2): Observable<any[]> {
        return this.http.get<any[]>(this.api2 + `/examen/${id}`)
            .pipe(map((res: any) => {
                return res.data;
            }
            ));
    }

}
