import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EvaluacionesModel } from 'app/models/evaluaciones.model';

// import { map } from 'rxjs/operators';
@Injectable()
export class EvaluacionesService {

    constructor(private http: HttpClient) {
    }

    private api = 'https://pbem4cq4f1.execute-api.us-east-1.amazonaws.com/Prod/api/v1/evaluation';
    private api2 = 'https://pbem4cq4f1.execute-api.us-east-1.amazonaws.com/Prod/api/v1/question';
    private api3 = 'https://6qrbzxo6q4.execute-api.us-east-1.amazonaws.com/Prod/api/v1/examen';
    // private api4 = 'https://6qrbzxo6q4.execute-api.us-east-1.amazonaws.com/Prod/api/v1/examen';


    //rvaluaciones
    public getListaEvaluaciones(id: any = 1): Observable<any[]> {
        return this.http.get<any[]>(this.api + `?branchOfficeId=${id}`)
            .pipe(map((res: any) => { return res.data; }));
    }
    public deleteEvaluation(id: any): Observable<any> {
        return this.http.post(this.api + '/delete', JSON.stringify(id));
    }
    public saveOrUpdateEvaluation(evaluation: EvaluacionesModel): Observable<any> {
        return this.http.post<any>(this.api, JSON.stringify(evaluation));
    }

    // Alternativas
    public getListaPreguntas(id: any = 1): Observable<any[]> {
        return this.http.get<any[]>(this.api2 + `?evaluationId=${id}`)
            .pipe(map((res: any) => { return res.data; }));
    }
    public deletePreguntas(id: any): Observable<any> {
        return this.http.post<any>(this.api2 + '/delete', JSON.stringify(id));
    }
    public saveOrUpdatePreguntas(preguntas: any): Observable<any> {
        return this.http.post<any>(this.api2, JSON.stringify(preguntas));
    }

    //respuestas
    public saveOrUpdateRespuestas(respuestas: any): Observable<any> {
        return this.http.post<any>(this.api3, JSON.stringify(respuestas));
    }

    //notas
    // public Listar(respuestas: any): Observable<any> {
    //     return this.http.post<any>(this.api3, JSON.stringify(respuestas));
    // }

    // respuestas
    // private api4 = 'https://6qrbzxo6q4.execute-api.us-east-1.amazonaws.com/Prod/api/v1/examen/resultados?studentId=1&evaluationId=15';
    public getListaRespuestas(idestudiante: any, idexamen): Observable<any[]> {
        return this.http.get<any[]>(this.api3 + `/resultados?studentId=${idestudiante}&evaluationId=${idexamen}`)
            .pipe(map((res: any) => { return res.data; }));
    }
}
