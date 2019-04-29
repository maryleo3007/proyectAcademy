import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { EvaluacionesService } from 'app/servicios/servicio.index';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { IdModel } from 'app/models/persona.model';
import { fuseAnimations } from '@fuse/animations';
import { AlternativaFormComponent } from '../alternativa-form/alternativa-form.component';

@Component({
  selector: 'app-alternativas',
  templateUrl: './alternativas.component.html',
  styleUrls: ['./alternativas.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AlternativasComponent implements OnInit {
  preguntas: any;
  valores: any;
  ELEMENT_DATA1: Array<any>;
  dialogRef: any;
  alternativas: Array<any>;
  displayedColumns = ['select', 'Titulo', 'Descripción', 'Estado'];
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA1);
  selection = new SelectionModel<any>(true, []);
  selecteparticipaAct: IdModel[];
  id: string;
  constructor(
    private _EvaluationSrv: EvaluacionesService,
    private routerActive: ActivatedRoute,
    private _matDialog: MatDialog
  ) {
    this.selecteparticipaAct = new Array<IdModel>();
    this.alternativas = new Array<any>();

  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.id = this.routerActive.snapshot.paramMap.get('id');
    this.ImprimirPreguntas();

  }
  ImprimirPreguntas() {
    this._EvaluationSrv.getListaPreguntas(this.id).subscribe(res => {
      this.preguntas = res;
      this.displayedColumns = ['select', 'Titulo', 'Descripción', 'Estado'];
      this.dataSource = new MatTableDataSource<any>(this.preguntas);
      this.selection = new SelectionModel<any>(true, []);
      this.dataSource.paginator = this.paginator;
    })
  }
  eventCheckbox(event, contactId) {
    if (event.checked) {
      let localId = new IdModel();
      localId.id = contactId.id;
      this.selecteparticipaAct.push(localId);

    } else {
      const elimanarcontac = this.selecteparticipaAct.findIndex(element => element.id === contactId.id);
      this.selecteparticipaAct.splice(elimanarcontac, 1);

    }
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
        // console.log(row);
        this.selection.select(row)
      });
  }
  Alternative(contact) {
    this.alternativas = contact.answers;
    for (let alter of this.alternativas) {
      if (alter.isAnswer === true) {
        this.valores = alter.description;
      }
    }

    this.dialogRef = this._matDialog.open(AlternativaFormComponent, {
      panelClass: 'contact-form-dialog',
      width: '70%',
      data: {
        action: 'Edit',
        marcado: this.valores,
        contact: contact,
        id: this.id
      }
    });

    this.dialogRef.afterClosed().subscribe((res: any) => {
      if (!res) {
        return;
      }
      console.log('paso por editar');
      this.ImprimirPreguntas();


    });
  }
  nuevaPregunta() {
    this.dialogRef = this._matDialog.open(AlternativaFormComponent, {
      panelClass: 'contact-form-dialog',
      width: '70%',
      data: {
        action: 'new',
        id: this.id
      }
    });

    this.dialogRef.afterClosed().subscribe((res: any) => {
      if (!res) {
        return;
      }
      console.log('paso por nueva');

      this.ImprimirPreguntas();
    });
  }
  eliminar() {
    this._EvaluationSrv.deletePreguntas(this.selecteparticipaAct).subscribe(res => {
      this.ImprimirPreguntas();
    })

  }

}
