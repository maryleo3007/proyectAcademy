import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CalendarioService, AsistenciaListaService, SucursalService } from 'app/servicios/servicio.index';
import { MatDialog } from '@angular/material';
import { VentanaComponent } from './ventana/ventana.component';
import { DOCUMENT } from '@angular/platform-browser';

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
  dialogRef: any;
  cambiarColor: any;
  sucursales: any;
  sucursal: any;

  constructor(
    @Inject(DOCUMENT) private _document,
    private _CalendarioSrv: CalendarioService,
    private _listaAsistenciaSrv: AsistenciaListaService,
    private _matDialog: MatDialog,
    private _sucursalSrv: SucursalService,
  ) {    
    this.term = '';
    this.cambiarColor= 'Esteesunddedeprueba';
  
   }

  ngOnInit() {
    
    this.verCalendario = false;
    this.imprimirCalendario();
  }
  imprimirCalendario(){
    this._CalendarioSrv.getCalenadrio().subscribe((res: any)=> {  
      // console.log(res);    
      this.accounts = res.data;
    });
    this._sucursalSrv.getSucursales().subscribe((res:any)=> {
      console.log(res);
      this.sucursales = res.data; 
    });
  }
  
  selectClick(mes:any) {
    this.verCalendario = true;
    this.semanas = mes.weeks;  

  }
  selectSucursal(sucursal) {
    this.sucursal = sucursal.id;
   
    
  }
  SemanaSeleccionada(semana, link:any) {    
    let selectores:any = this._document.getElementsByClassName('selector');
    for(let ref of selectores) {
      ref.classList.remove('colorAzul')    }
    link.classList.add('colorAzul');     
    this.fechainicio = 'startDate=' +  this.cambiarfecha( semana.startDate);
    this.fechafin = 'endDate='+ this.cambiarfecha( semana.endDate);
    this._listaAsistenciaSrv.getAsistenciaAlumno(this.fechainicio,this.fechafin, this.sucursal).subscribe((res: any) => {      
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
  lookAsistens(asitencia: any, tiempo:any): void
    {
      var name = asitencia.name +' '+  asitencia.lastName +' '+  asitencia.secondLastName;
      var date = tiempo.date;
      var dayName = tiempo.dayName;
      var registrationStartDate = tiempo.morning.registrationStartDate;
      var registrationEndDate = tiempo.morning.registrationEndDate;
      // var dayName = asitencia.record.monday.dayName;
      // var dayName = asitencia.record.monday.dayName;
      // var dayName = asitencia.record.monday.dayName;


      console.log(asitencia,tiempo);
      
        this.dialogRef = this._matDialog.open(VentanaComponent, {            
            width: '25%',
            data      : {
              name: name,
              date: date,
              dayName: dayName,
              registrationStartDate: registrationStartDate, 
              registrationEndDate: registrationEndDate,         
            }
        });

        this.dialogRef.afterClosed().subscribe((res: any) => {
                if ( !res )
                {
                    return;
                }
                
                
            });
    }

 

}
