import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { AsistenciaRegistroService } from '../../../servicios/asistencia/asistencia.service';
declare var swal: any;
@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ControlComponent implements OnInit {
  nombre : string;
  dni: string;

  documentNumber: any = '';
  verMensaje: boolean;
  listapersona: any;  
  correo: any;  
  mensaje: any;
  verRojo: boolean;
  verTabla: boolean;
  
  constructor(
    private _asistenciaSrv: AsistenciaRegistroService,
  ) { }

  ngOnInit() {
    this.verMensaje= false;
    this.verRojo = false;
    this.verTabla = false;
  }
  
  controlbarra(){
    if(this.documentNumber === '')
   {
     console.log('pase la tarjeta');
     
   }
    else {
      const document = {"documentNumber":`${this.documentNumber}`};
      this._asistenciaSrv.getAsistenciaAlumno(document).subscribe((res: any) => {
        console.log(res); 
        if(res.data !== null) {
          this.nombre = res.data.name +' ' +  res.data.lastName
          this.dni = res.data.documentNumber;
          this.correo = res.data.email;          
        }       
        if(res.code ===1) {
          this.verTabla = true;
          this.verRojo = false;
         this.mensaje = "Bienvenido: " + this.nombre ;
        }
        if(res.code ===2) {
          this.verTabla = false;
          this.mensaje = res.message;
          this.verMensaje= true;
        }
        if(res.code === 3) {
          this.verTabla = true;
          this.verRojo = true;
          this.listapersona = res.data; 
          this.mensaje = res.message;     
        
          
        }
      this.verMensaje = true;
    });
    this.documentNumber = '';
  }
}
}
