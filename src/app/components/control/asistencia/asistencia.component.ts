import { Component, OnInit, ViewEncapsulation, Pipe, PipeTransform } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CalendarioService, AsistenciaListaService } from 'app/servicios/servicio.index';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AsistenciaComponent implements OnInit {
  accounts: object;  
  verCalendario: boolean;
  semanas: any
  fechainicio: any;
  fechafin: string;
  Alumnos: any;
  p = 1;
  public term: any;
  public binding: any;
  
  constructor(
    private _CalendarioSrv: CalendarioService,
    private _listaAsistenciaSrv: AsistenciaListaService,
  ) {    
    this.term = '';
  
   }

  ngOnInit() {
    
    this.verCalendario = false;
    this.imprimirCalendario();
  }
  imprimirCalendario(){
    this._CalendarioSrv.getCalenadrio().subscribe((res: any)=> {      
      this.accounts = res.data;
    });
  }
  
  selectClick(mes:any) {
    this.verCalendario = true;
    this.semanas = mes.weeks;  

  }
  SemanaSeleccionada(semana) {  
  this.fechainicio = 'startDate=' +  this.cambiarfecha( semana.startDate);
  this.fechafin = 'endDate='+ this.cambiarfecha( semana.endDate);
   this._listaAsistenciaSrv.getAsistenciaAlumno(this.fechainicio,this.fechafin).subscribe((res: any) => {
    console.log(res.data); 
    this.Alumnos = res.data;
       
   });    
  }
  cambiarfecha(fecha) {  
    var aperturaanio = String(fecha); 
    var apertura_dia = aperturaanio.substr(0, 2);
    var apertura_mes = aperturaanio.substr(3, 2);   
    var apertura_anio = aperturaanio.substr(6, 4);    
return apertura_anio+'-'+apertura_mes+'-'+apertura_dia;
  }
 

}
