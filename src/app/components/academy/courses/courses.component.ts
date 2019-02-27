import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { fuseAnimations } from '@fuse/animations';
import { AcademiService } from 'app/servicios/servicio.index';


@Component({
    selector: 'academy-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss'],
    animations: fuseAnimations
})
export class AcademyCoursesComponent implements OnInit, OnDestroy {
    categories: any[];
    courses: any[];
    coursesFilteredByCategory: any[];
    filteredCourses: any[];
    currentCategoryEstado: any;
    currentCategoryTipo: any;
    searchTerm: string;

    // Private
    private _unsubscribeAll: Subject<any>;
    Estado: any;
    Tipo: any;

    /**
     * Constructor
     *
     * @param {AcademyCoursesService} _academyCoursesService
     */
    constructor(
        private _academiSrv: AcademiService,
    ) {
        // Set the defaults
        this.currentCategoryEstado = 0;
        this.currentCategoryTipo = 0;
        this.searchTerm = '';

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.imprimirTipo();
        this.impirmircursos();
        // this.categories = this._academiSrv.categories;
        // this.filteredCourses = this.coursesFilteredByCategory = this.courses = .data;

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    imprimirTipo() {
        this._academiSrv.geListaEstados().subscribe((res: any) => {
            this.Estado = res.data;
        })
        this._academiSrv.geListaTipos().subscribe((res: any) => {
            this.Tipo = res.data;
        })
    }
    impirmircursos() {
        this._academiSrv.geListaExamenes().subscribe((res: any) => {
            this.filteredCourses = this.coursesFilteredByCategory = this.courses = res.data;            

        })
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Filter courses by Tipo
     */
    filterCoursesByTipo(): void {
        // Filter
        if (this.currentCategoryTipo === 0) {
            this.coursesFilteredByCategory = this.courses;
            this.filteredCourses = this.courses;
        }
        else {
            this.coursesFilteredByCategory = this.courses.filter((course) => {
                return course.examTypeId === this.currentCategoryTipo;
            });

            this.filteredCourses = [...this.coursesFilteredByCategory];

        }

        // Re-filter by search term
        this.filterCoursesByTerm();
    }
    // filter curses by Estado
    filterCoursesByEstado(): void {
        // Filter
        if (this.currentCategoryEstado === 0) {
            this.coursesFilteredByCategory = this.courses;
            this.filteredCourses = this.courses;
        }
        else {
            this.coursesFilteredByCategory = this.courses.filter((course) => {
                return course.statusId === this.currentCategoryEstado;
            });

            this.filteredCourses = [...this.coursesFilteredByCategory];

        }

        // Re-filter by search term
        this.filterCoursesByTerm();
    }

    /**
     * Filter courses by term
     */
    filterCoursesByTerm(): void {
        const searchTerm = this.searchTerm.toLowerCase();

        // Search
        if (searchTerm === '') {
            this.filteredCourses = this.coursesFilteredByCategory;
        }
        else {
            this.filteredCourses = this.coursesFilteredByCategory.filter((course) => {
                return course.title.toLowerCase().includes(searchTerm);
            });
        }
    }
}
