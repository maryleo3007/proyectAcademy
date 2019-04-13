import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AcademiService } from 'app/servicios/servicio.index';
import { fuseAnimations } from '@fuse/animations';
import { ExamenModel } from 'app/models/examen.model';

@Component({
  selector: 'app-pregunta-form',
  templateUrl: './pregunta-form.component.html',
  styleUrls: ['./pregunta-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class PreguntaFormComponent implements OnInit {
  action: any;
  favoriteSeason: string;
  Tipos: any;
  examen: ExamenModel;
  itemselect: string;
  constructor(
    private AcademiSrv: AcademiService,
    public dialogRef: MatDialogRef<PreguntaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.examen = new ExamenModel();
    this.action = data.action;
    if (this.action === 'Nuevo') {
      this.examen.indActivo = false;
    } else {
      if (data.contact) {
        if (data.contact.examTypeName === 'EXAMEN DIARIO')
          this.itemselect = 'EXAMEN DIARIO';
        else if (data.contact.examTypeName === 'EXAMEN SEMANAL') {
          this.itemselect = 'EXAMEN SEMANAL';
        }
        this.examen.name = data.contact.name;
        this.examen.examDate = data.contact.examDate;
        this.examen.time = data.contact.time;
      }
    }
  }

  ngOnInit() {
    this.imprimirTipo();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  imprimirTipo() {
    this.AcademiSrv.geListaTipos().subscribe((res: any) => {
      this.Tipos = res.data;
    })
  }
  activado() {
    this.examen.indActivo = true;
  }
  radioclick(radio) {
    console.log(radio);
    this.examen.examTypeName = radio.name;
    this.examen.examTypeId = radio.id;

  }
}
