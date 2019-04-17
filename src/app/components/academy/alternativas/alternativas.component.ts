import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AcademiService } from 'app/servicios/servicio.index';
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
  ELEMENT_DATA1: Array<any>;
  dialogRef: any;
  displayedColumns = ['select', 'Titulo', 'Descripción', 'Estado'];
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA1);
  selection = new SelectionModel<any>(true, []);
  selecteparticipaAct: IdModel[];
  constructor(
    private AcademiSrv: AcademiService,
    private routerActive: ActivatedRoute,
    private _matDialog: MatDialog
  ) {
    this.selecteparticipaAct = new Array<IdModel>();

  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    const id = this.routerActive.snapshot.paramMap.get('id');
    console.log(id);
    this.ImprimirPreguntas();

  }
  ImprimirPreguntas() {
    this.preguntas = this.AcademiSrv.preguntas;
    this.displayedColumns = ['select', 'Titulo', 'Descripción', 'Estado'];
    this.dataSource = new MatTableDataSource<any>(this.preguntas);
    this.selection = new SelectionModel<any>(true, []);
    this.dataSource.paginator = this.paginator;
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
        console.log(row);
        this.selection.select(row)
      });
  }
  Alternative(contact) {
    this.dialogRef = this._matDialog.open(AlternativaFormComponent, {
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


    });
  }
}
