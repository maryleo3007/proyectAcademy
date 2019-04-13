import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// import { map } from 'rxjs/operators';
@Injectable()
export class AcademiService {

    public data: any = [
        {
            id: 1,
            name: "MATEMATICA",
            examTypeId: 1,
            examTypeName: "EXAMEN DIARIO",
            indActivo: true,
            time: "30",
            examDate: "27/02/2019"
        },
        {
            id: 2,
            name: "HISTORIA DEL PERU",
            examTypeId: 1,
            examTypeName: "EXAMEN DIARIO",
            indActivo: true,
            time: "30",
            examDate: "27/02/2019"
        },
        {
            id: 3,
            name: "LENGUAJE",
            examTypeId: 1,
            examTypeName: "EXAMEN DIARIO",
            indActivo: false,
            time: "30",
            examDate: "27/02/2019"
        },
        {
            id: 4,
            name: "HISTORIA UNIVERSAL",
            examTypeId: 1,
            examTypeName: "EXAMEN DIARIO",
            indActivo: true,
            time: "30",
            examDate: "27/02/2019"
        },
        {
            id: 5,
            name: "HISTORIA GEOMETRIA",
            examTypeId: 1,
            examTypeName: "EXAMEN DIARIO",
            indActivo: false,
            time: "30",
            examDate: "27/02/2019"
        }
    ]


    constructor(private http: HttpClient) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'authkey',
                'userid': '1'
            })
        };
    }

    private api = 'https://77u1gf7xyj.execute-api.us-east-1.amazonaws.com/Prod/api/v1'
    private api2 = 'https://pbem4cq4f1.execute-api.us-east-1.amazonaws.com/Prod/api/v1'
    // private api3 = 'https://77u1gf7xyj.execute-api.us-east-1.amazonaws.com/Prod/api/v1/catalogue/2'

    // public geListaEstados(): Observable<any[]> {
    //     return this.http.get<any[]>(this.api + '/catalogue/1');
    // }
    public geListaTipos(): Observable<any[]> {
        return this.http.get<any[]>(this.api + '/catalogue/2');
    }
    public geListaCursosxFechas(idEstuden: number = 442, tipeExamen: number = 1, dateInit = '2019-02-27', dateFin = '2019-02-28'): Observable<any[]> {
        return this.http.get<any[]>(this.api2 + `/examen?studentId=${idEstuden}&examTypeId=${tipeExamen}&examDateIni=${dateInit}&examDateFin=${dateFin}`)
            .pipe(map((res: any) => {
                return res.data;
            }
            ));
    }
    // public geListaExamenes(): Observable<any[]> {
    //     return this.http.get<any[]>(this.api2 + '/examen');
    // }
    public getExamenesxId(id: any = 2): Observable<any[]> {
        return this.http.get<any[]>(this.api2 + `/examen/${id}`)
            .pipe(map((res: any) => {
                return res.data;
            }
            ));
    }

}
