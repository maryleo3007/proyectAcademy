import { Component, OnInit, Inject, ViewEncapsulation, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AcademiService } from 'app/servicios/servicio.index';
import { fuseAnimations } from '@fuse/animations';
import { EvaluacionesModel } from 'app/models/evaluaciones.model';

@Component({
  selector: 'app-pregunta-form',
  templateUrl: './pregunta-form.component.html',
  styleUrls: ['./pregunta-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class PreguntaFormComponent implements OnInit, OnDestroy {
  action: any;
  favoriteSeason: string;
  Tipos: any;
  examen: EvaluacionesModel;
  itemselect: string;
  constructor(
    private AcademiSrv: AcademiService,
    public dialogRef: MatDialogRef<PreguntaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.examen = new EvaluacionesModel();
    this.action = data.action;
    if (this.action === 'Nuevo') {
      this.examen.active = false;
      this.examen.id === null
    } else {
      if (data.contact) {
        if (data.contact.evaluationTypeName === 'EXAMEN DIARIO')
          this.itemselect = 'EXAMEN DIARIO';
        else if (data.contact.evaluationTypeName === 'EXAMEN SEMANAL') {
          this.itemselect = 'EXAMEN SEMANAL';
        }

        this.examen.active = data.contact.active;
        this.examen.id = data.contact.id;
        this.examen.name = data.contact.name;
        this.examen.evaluationDate = data.contact.evaluationDate;
        this.examen.time = data.contact.time;
      }
    }
  }

  ngOnInit() {
    this.imprimirTipo();
  }
  onNoClick(): void {
    this.dialogRef.close();
    this.examen = new EvaluacionesModel();
  }
  imprimirTipo() {
    this.AcademiSrv.geListaTipos().subscribe((res: any) => {
      this.Tipos = res.data;
    })
  }
  activado() {
    this.examen.active = true;
  }
  radioclick(radio) {
    this.examen.evaluationTypeName = radio.name;
    this.examen.evaluationTypeId = radio.id;

  }
  ngOnDestroy() {
    this.examen = new EvaluacionesModel();
  }
}
