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
  OfficeService,
  SucursalService,
  AcademiService,
  EvaluacionesService
} from './servicio.index';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AcademiService,
    AlumnoService,
    ProfesorService,
    SidebarService,
    AsistenciaRegistroService,
    AsistenciaListaService,
    CalendarioService,
    OfficeService,
    SucursalService,
    EvaluacionesService
  ],
  declarations: []
})
export class ServiceModule { }

