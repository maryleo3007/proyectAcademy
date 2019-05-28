import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
declare var swal: any;
import { fuseAnimations } from '@fuse/animations';
import { AcademiService } from 'app/servicios/servicio.index';
import { Router, ActivatedRoute } from '@angular/router';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';


@Component({
    selector: 'academy-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss'],
    providers: [
        // The locale would typically be provided on the root module of your application. We do it at
        // the component level here, due to limitations of our example generation script.
        { provide: MAT_DATE_LOCALE, useValue: 'fr' },

        // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
        // `MatMomentDateModule` in your applications root module. We provide it at the component level
        // here, due to limitations of our example generation script.
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    ],
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
    prueba = '2020';
    Estado: any;
    Tipo: any;
    fechainicio: any;
    hoy: Date;
    maniana: Date;
    idEstudiante: number;
    tipeExamen: number;
    dateInit: string;
    dateFin: string;
    anio1: string;
    mes1: string;
    mes2: number;
    primero: string;
    segundo: string;
    anio2: number;
    /**
     * Constructor
     *
     * @param {AcademyCoursesService} _academyCoursesService
     */
    constructor(
        private _academiSrv: AcademiService,
        private _router: Router
    ) {
        // fecha de hoy
        this.anio1 = new Date().toISOString().substr(0, 4);
        this.mes1 = new Date().toISOString().substr(5, 2);
        if (parseInt(this.mes1) === 12) {
            this.anio2 = parseInt(this.anio1) + 1;
            this.mes2 = 1;

            this.primero = this.anio1 + '-' + this.mes1 + '-02';
            this.segundo = this.anio2 + '-0' + this.mes2 + '-02';
        } else {
            this.anio2 = parseInt(this.anio1);
            this.mes2 = parseInt(this.mes1) + 1;
            if (parseInt(this.mes1) < 10) {
                this.primero = this.anio1 + '-' + this.mes1 + '-02';
                this.segundo = this.anio2 + '-0' + this.mes2 + '-02';
            } else {
                this.primero = this.anio1 + '-' + this.mes1 + '-02';
                this.segundo = this.anio2 + '-' + this.mes2 + '-02';
            }
        }
        console.log(parseInt(this.prueba));



        this.hoy = new Date(this.primero);
        this.maniana = new Date(this.segundo);
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
        this.idEstudiante = parseInt(localStorage.getItem('idusuario'));
        this.tipeExamen = 0;
        this.dateInit = '2019-05-01';
        this.dateFin = '2019-06-01';
        this.imprimirTipo();
        this.impirmircursos(this.idEstudiante, this.tipeExamen, this.dateInit, this.dateFin);

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
        this._academiSrv.geListaTipos().subscribe((res: any) => {
            this.Tipo = res.data;
        })
    }
    impirmircursos(idEstudiante, tipeExamen, dateInit, dateFin) {
        this._academiSrv.geListaCursosxFechas(idEstudiante, tipeExamen, dateInit, dateFin).subscribe((res: any) => {
            this.filteredCourses = this.coursesFilteredByCategory = this.courses = res;

        })
    }

    filtroFechainicio(evento): void {
        this.dateInit = this.ordenar(evento);
        this.impirmircursos(this.idEstudiante, this.tipeExamen, this.dateInit, this.dateFin);


    }
    filtroFechaFin(evento) {
        this.dateFin = this.ordenar(evento);
        this.impirmircursos(this.idEstudiante, this.tipeExamen, this.dateInit, this.dateFin);
    }
    ordenar(fecha) {
        return fecha.toISOString().substr(0, 4) + '-' + fecha.toISOString().substr(5, 2) + '-' + fecha.toISOString().substr(8, 2);
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
    empezarExamen(id, name, time) {

        swal({
            title: "Empezar examen?",
            text: "¿DESEA EMPEZAR EL " + name + '? TIENES ' + time + ':00 MINUTOS',
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    this._router.navigate(['/Academia/Cursos', id, name, time]);
                } else {
                    swal("Cancelado!");
                }
            });
    }
}
