import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms/src/forms';
import { EvaluacionesService } from 'app/servicios/servicio.index';
import { DOCUMENT } from '@angular/platform-browser';
declare var swal: any;
@Component({
  selector: 'app-alternativa-form',
  templateUrl: './alternativa-form.component.html',
  styleUrls: ['./alternativa-form.component.scss']
})
export class AlternativaFormComponent implements OnInit {
  card: any;
  chekeadodescripcion = '';
  PreguntaNew: PreguntaModel;
  descriptionnuew = '';
  alternativasmandar: Array<CuestionModel>;
  nuevoAlterna: { id: number; questionId: number; description: string; isAnswer: boolean };
  activarAdd = true;
  constructor(
    @Inject(DOCUMENT) private _document,
    private _alternativaSrv: EvaluacionesService,
    public dialogRef: MatDialogRef<AlternativaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // console.log(data);
    this.PreguntaNew = new PreguntaModel();
    this.alternativasmandar = new Array<CuestionModel>();
    this.PreguntaNew.evaluationId = this.data.id;
    if (data.action === 'Edit') {
      this.PreguntaNew.id = data.contact.id;
      this.PreguntaNew.title = data.contact.title;
      this.PreguntaNew.description = data.contact.description;
      this.PreguntaNew.active = data.contact.active;
      this.alternativasmandar = data.contact.answers;
      this.chekeadodescripcion = data.marcado;
    }
  }
  ngOnInit() {

  }
  cambios(newObj) {
    // console.log(newObj.length);
    if (newObj.length !== 0) {
      this.activarAdd = false;
    } else {
      this.activarAdd = true;
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  addNewCuestion(description) {
    this.nuevoAlterna = { id: null, questionId: null, description: '', isAnswer: false };
    this.nuevoAlterna.description = description;
    this.nuevoAlterna.id = null;
    if (this.data.action === 'Edit') {
      this.nuevoAlterna.questionId = this.data.contact.id;
    } else {
      this.nuevoAlterna.questionId = null;
    }
    this.nuevoAlterna.isAnswer = false;
    this.alternativasmandar.push(this.nuevoAlterna);
    console.log(this.nuevoAlterna);

    this.descriptionnuew = '';
  }
  addCheckItem(form: NgForm): void {

  }
  removeChecklistItem(indice): void {
    console.log(this.alternativasmandar[indice]);
    this.alternativasmandar.splice(indice, 1);
  }
  updateCheckedCount(list: any): void {
    this.alternativasmandar.map(function (dato) {
      if (dato.isAnswer === true) {
        dato.isAnswer = false;
      }
      if (dato.description === list.description) {
        dato.isAnswer = true;
      }
      return dato;
    });

  }

  removeChecklist(checklist): void {
    this.card.checklists.splice(this.card.checklists.indexOf(checklist), 1);
  }
  GuardarPregunta() {
    this.PreguntaNew.answers = this.alternativasmandar;
    console.log(this.PreguntaNew);
    console.log('----------');
    this._alternativaSrv.saveOrUpdatePreguntas(this.PreguntaNew).subscribe(res => {
      if (res.code === 1) {
        swal('Bien!', 'Guardado!', 'success').then(() => {
          this.onNoClick();
        });
      } else {
        console.error('error');
      }
    });
  }
}
export class CuestionModel {
  id: number;
  description: string;
  isAnswer: boolean;
}
export class PreguntaModel {
  id: number = null;
  evaluationId: number;
  title: string = 'PREGUNTA';
  description: string;
  active: boolean = true;
  answers: Array<any>;
}
