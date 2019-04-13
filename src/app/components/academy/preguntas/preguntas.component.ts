import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { AcademiService } from 'app/servicios/servicio.index';
import { fuseAnimations } from '@fuse/animations';
import { PreguntaFormComponent } from '../pregunta-form/pregunta-form.component';
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
  checkboxes: {};
  currentCategoryTipo = 0;
  ELEMENT_DATA1: Array<any>;
  dialogRef: any;
  displayedColumns = ['examTypeName', 'name', 'examDate'];
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA1);
  selection = new SelectionModel<any>(true, []);
  currentOffice = '';

  constructor(
    private _academiSrv: AcademiService,
    private _matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.examenes = this._academiSrv.data;
    console.log(this.examenes);
    this.displayedColumns = ['examTypeName', 'name', 'examDate', 'indActivo', 'time', 'boton'];
    this.dataSource = new MatTableDataSource<any>(this.examenes);
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
      console.log(res.examDate._i.date + '-' + res.examDate._i.month + '-' + res.examDate._i.year);


    });
  }
  eliminar() {

  }

}
