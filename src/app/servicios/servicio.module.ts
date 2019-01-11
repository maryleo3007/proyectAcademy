import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  AlumnoService,  
  SidebarService,
  ProfesorService,
  AsistenciaRegistroService,
  AsistenciaListaService,
  CalendarioService,
  OfficeService
} from './servicio.index';


@NgModule({
    imports: [      
      CommonModule,
      HttpClientModule
    ],
    providers: [
      AlumnoService,     
      ProfesorService,
      SidebarService,
      AsistenciaRegistroService,
      AsistenciaListaService, 
      CalendarioService,
      OfficeService 
    ],
    declarations: []
  })
  export class ServiceModule { }
  