import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { EvaluacionesService } from 'app/servicios/servicio.index';
import { fuseAnimations } from '@fuse/animations';
import { PreguntaFormComponent } from '../pregunta-form/pregunta-form.component';
import { EvaluacionesModel } from '../../../models/evaluaciones.model';
@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class PreguntasComponent implements OnInit {
  selectedContacts: any[];
  examenes: any;
  examen: EvaluacionesModel;
  checkboxes: {};
  currentCategoryTipo = 0;
  ELEMENT_DATA1: Array<any>;
  dialogRef: any;
  displayedColumns = ['evaluationTypeName', 'name', 'evaluationDate', 'active', 'time', 'boton'];
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA1);
  selection = new SelectionModel<any>(true, []);
  currentOffice = '';

  constructor(
    private _EvaluationSrv: EvaluacionesService,
    private _matDialog: MatDialog
  ) {
    this.examen = new EvaluacionesModel();
  }

  ngOnInit() {
    this.imprimir();
  }

  filterCoursesByTipo(): void {
    // Filter

    // if (this.currentCategoryTipo === 0) {
    //     this.coursesFilteredByCategory = this.courses;
    //     this.filteredCourses = this.courses;
    // }
    // else {
    //     this.coursesFilteredByCategory = this.courses.filter((course) => {
    //         return course.examTypeId === this.currentCategoryTipo;
    //     });

    //     this.filteredCourses = [...this.coursesFilteredByCategory];

    // }

    // Re-filter by search term
    // this.filterCoursesByTerm();
  }
  imprimir() {
    this._EvaluationSrv.getListaEvaluaciones().subscribe(res => {
      if (res !== null)
        this.examenes = res;
      this.displayedColumns = ['evaluationTypeName', 'name', 'evaluationDate', 'active', 'time', 'boton'];
      this.dataSource = new MatTableDataSource<any>(this.examenes);
    })

  }

  EditExamen(contact: any) {
    this.dialogRef = this._matDialog.open(PreguntaFormComponent, {
      panelClass: 'contact-form-dialog',
      width: '50%',
      data: {
        action: 'Edit',
        contact: contact
      }
    });

    this.dialogRef.afterClosed().subscribe((res: any) => {
      if (!res) {
        return;
      }
      // console.log(res);
      this.examen.id = res.id;
      this.examen.active = res.active;
      this.examen.branchOfficeId = res.branchOfficeId;
      this.examen.evaluationTypeId = res.evaluationTypeId;
      this.examen.evaluationTypeName = res.evaluationTypeName;
      this.examen.name = res.name;
      this.examen.time = res.time;
      // console.log(res.evaluationDate.length);

      if (res.evaluationDate.length === undefined) {
        this.examen.evaluationDate = res.evaluationDate._i.date + '/' + (parseInt(res.evaluationDate._i.month) + 1) + '/' + res.evaluationDate._i.year;
      } else {
        this.examen.evaluationDate = res.evaluationDate;
      }
      console.log(this.examen);
      this.saveOrUpdateEvaluation(this.examen);

    });
  }
  newExamen() {
    this.dialogRef = this._matDialog.open(PreguntaFormComponent, {
      panelClass: 'contact-form-dialog',
      width: '50%',
      data: {
        action: 'Nuevo'
      }
    });

    this.dialogRef.afterClosed().subscribe((res: any) => {
      if (!res) {
        return;
      }

      this.examen.id = res.id;
      this.examen.active = res.active;
      this.examen.branchOfficeId = res.branchOfficeId;
      this.examen.evaluationTypeId = res.evaluationTypeId;
      this.examen.evaluationTypeName = res.evaluationTypeName;
      this.examen.name = res.name;
      this.examen.time = res.time;
      if (res.evaluationDate.length === undefined) {
        this.examen.evaluationDate = (parseInt(res.evaluationDate._i.date) + 1) + '/' + res.evaluationDate._i.month + '/' + res.evaluationDate._i.year;
      } else {
        this.examen.evaluationDate = res.evaluationDate;
      }
      this.saveOrUpdateEvaluation(this.examen);
    });
  }
  eliminar() {

  }

  saveOrUpdateEvaluation(examen: EvaluacionesModel) {
    this._EvaluationSrv.saveOrUpdateEvaluation(examen).subscribe(res => {
      console.log(res);
      this.imprimir();
      this.examen = new EvaluacionesModel();
    })
  }

}
