import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { AcademiService } from 'app/servicios/servicio.index';
import { fuseAnimations } from '@fuse/animations';
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
    private _academiSrv: AcademiService
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

}
