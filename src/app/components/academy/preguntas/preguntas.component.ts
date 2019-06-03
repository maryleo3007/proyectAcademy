import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { EvaluacionesService, AcademiService } from 'app/servicios/servicio.index';
import { fuseAnimations } from '@fuse/animations';
import { PreguntaFormComponent } from '../pregunta-form/pregunta-form.component';
import { EvaluacionesModel } from '../../../models/evaluaciones.model';
import { IdModel } from 'app/models/persona.model';
declare var swal: any;


@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class PreguntasComponent implements OnInit {
  selectedContacts: any[];
  selecteparticipaAct: Array<IdModel>;
  examenes: any;
  examenesFilter: any;
  examen: EvaluacionesModel;
  checkboxes: {};
  currentCategoryTipo = 0;
  ELEMENT_DATA1: Array<any>;
  dialogRef: any;
  displayedColumns = ['select', 'evaluationTypeName', 'name', 'evaluationDate', 'active', 'time', 'boton'];
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA1);
  selection = new SelectionModel<any>(true, []);
  currentOffice = '';
  Tipo: any;
  AlterEliminar: { id: any; };
  chekeado = false;;
  // AlterEliminarall: Array<any>;

  constructor(
    private _academiSrv: AcademiService,
    private _EvaluationSrv: EvaluacionesService,
    private _matDialog: MatDialog
  ) {
    this.examen = new EvaluacionesModel();
    this.selecteparticipaAct = new Array<IdModel>();
  }

  ngOnInit() {
    this.imprimir();
    this.imprimirTipo();
  }
  imprimirTipo() {
    this._academiSrv.geListaTipos().subscribe((res: any) => {
      this.Tipo = res.data;
    })
  }

  filterCoursesByTipo(): void {
    // Filter
    // console.log(this.currentCategoryTipo);
    console.log(this.currentCategoryTipo);

    // if (this.currentCategoryTipo === 0) {
    //   this.mostrartabla(this.examenes)
    // }
    // else {
    //   this.examenes = this.examenes.filter((course) => {
    //     return course.evaluationTypeId === this.currentCategoryTipo;
    //   });

    //   this.examenesFilter = [...this.examenes];

    //   this.mostrartabla(this.examenesFilter)
    // }

    // Re-filter by search term
    // this.filterCoursesByTerm();
  }
  applyFilter(filterValue: string) {

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  imprimir() {
    this._EvaluationSrv.getListaEvaluaciones(this.currentCategoryTipo).subscribe(res => {
      console.log(res);
      if (res !== null) {
        this.examenesFilter = this.examenes = res;
        this.mostrartabla(this.examenesFilter)
      }
    })

  }
  mostrartabla(informacio: any) {
    this.displayedColumns = ['select', 'evaluationTypeName', 'name', 'evaluationDate', 'active', 'time', 'boton'];
    this.dataSource = new MatTableDataSource<any>(informacio);
  }

  selecionardor() {
    if (this.chekeado === false) {
      if (this.examenesFilter !== null) {
        for (let pregunta of this.examenesFilter) {
          let localId = new IdModel();
          localId.id = pregunta.id;
          this.selecteparticipaAct.push(localId);
        }
        // console.log(this.selecteparticipaAct);
      } else {
        this.selecteparticipaAct = new Array<IdModel>();
      }
    } else {
      this.selecteparticipaAct = new Array<IdModel>();
    }
    this.chekeado = !this.chekeado;

  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => {
        this.AlterEliminar = { id: null };
        this.selection.select(row);
        this.AlterEliminar.id = row.id;
        this.selecteparticipaAct.push(this.AlterEliminar);
      });
    // console.log(this.selecteparticipaAct);
  }
  eventCheckbox(event, contactId) {
    this.AlterEliminar = { id: null };
    if (event.checked) {
      this.AlterEliminar.id = contactId.id;
      this.selecteparticipaAct.push(this.AlterEliminar);
    } else {
      const elimanarcontac = this.selecteparticipaAct.findIndex(element => element.id === contactId.id);
      this.selecteparticipaAct.splice(elimanarcontac, 1);
    }
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
      console.log(res);
      // this.examen.id = res.id;
      // this.examen.active = res.active;
      // this.examen.branchOfficeId = res.branchOfficeId;
      // this.examen.evaluationTypeId = res.evaluationTypeId;
      // this.examen.evaluationTypeName = res.evaluationTypeName;
      // this.examen.name = res.name;
      // this.examen.time = res.time;
      // this.examen.evaluationDate = res.evaluationDate;
      // this.saveOrUpdateEvaluation(this.examen);

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
      console.log(res);
      // this.examen.id = res.id;
      // this.examen.active = res.active;
      // this.examen.branchOfficeId = res.branchOfficeId;
      // this.examen.evaluationTypeId = res.evaluationTypeId;
      // this.examen.evaluationTypeName = res.evaluationTypeName;
      // this.examen.name = res.name;
      // this.examen.time = res.time;
      // this.examen.evaluationDate = res.evaluationDate;
      // console.log(this.examen);
      // this.saveOrUpdateEvaluation(this.examen);

    });
  }
  eliminar() {

    swal({
      title: "Desea eliminar?",
      text: "Esta seguro de eliminar!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          console.log(this.selecteparticipaAct);
          this._EvaluationSrv.deleteEvaluation(this.selecteparticipaAct).subscribe(res => {

            this.imprimir();
          });
          swal("Eliminado!", {
            icon: "success",
          });
        } else {
          swal("Cancelado!");
        }
      });
  }
  saveOrUpdateEvaluation(examen: EvaluacionesModel) {
    this._EvaluationSrv.saveOrUpdateEvaluation(examen).subscribe(res => {
      console.log(res);
      if (res.code === 1) {
        this.imprimir();
        swal('Bien!', 'Guardado!', 'success').then(() => {
          this.examen = new EvaluacionesModel();
        });
      }
    });
  }

}
