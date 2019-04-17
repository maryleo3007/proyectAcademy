import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// import { map } from 'rxjs/operators';
@Injectable()
export class AcademiService {

    public data: any = [
        {
            id: 101,
            name: "MATEMATICA",
            examTypeId: 1,
            examTypeName: "EXAMEN DIARIO",
            indActivo: true,
            time: "30",
            examDate: "27/02/2019"
        },
        {
            id: 102,
            name: "HISTORIA DEL PERU",
            examTypeId: 1,
            examTypeName: "EXAMEN DIARIO",
            indActivo: true,
            time: "30",
            examDate: "27/02/2019"
        },
        {
            id: 103,
            name: "LENGUAJE",
            examTypeId: 1,
            examTypeName: "EXAMEN DIARIO",
            indActivo: false,
            time: "30",
            examDate: "27/02/2019"
        },
        {
            id: 104,
            name: "HISTORIA UNIVERSAL",
            examTypeId: 1,
            examTypeName: "EXAMEN DIARIO",
            indActivo: true,
            time: "30",
            examDate: "27/02/2019"
        },
        {
            id: 105,
            name: "HISTORIA GEOMETRIA",
            examTypeId: 1,
            examTypeName: "EXAMEN DIARIO",
            indActivo: false,
            time: "30",
            examDate: "27/02/2019"
        }
    ]
    public preguntas: any = [
        {
            id: 1,
            title: "PREGUNTA 1",
            description: "¡El señor de Sipan, fue un gobernante de la cultura ........., cuya tumba fue descubierta y escabada por ........?",
            active: true
        },
        {
            id: 2,
            title: "PREGUNTA 2",
            description: "¡El señor de Sipan, fue descubierta Por ........?",
            active: true
        },
        {
            id: 3,
            title: "PREGUNTA 3",
            description: "¡El señor de Sipan, Pertenece a la cultura ........?",
            active: false
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
