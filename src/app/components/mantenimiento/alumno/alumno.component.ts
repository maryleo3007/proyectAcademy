import { Component, OnInit } from '@angular/core';
import { AlumnoService } from 'app/servicios/servicio.index';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styles: []
})
export class AlumnoComponent implements OnInit {

  constructor(
    private alumnoSrv: AlumnoService,
  ) { }

  ngOnInit() {
  }

}
