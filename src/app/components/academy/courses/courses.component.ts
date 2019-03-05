import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
declare var swal: any;
import { fuseAnimations } from '@fuse/animations';
import { AcademiService } from 'app/servicios/servicio.index';
import { Router } from '@angular/router';


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
    today: string;
    fechainicio: any;
    hoy: Date;
    maniana: Date;
    idEstudiante: number;
    tipeExamen: number;
    dateInit: string;
    dateFin: string;
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
        this.hoy = new Date();
        this.maniana = new Date();
        this.today = new Date().toISOString().substr(0, 10);
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
        this.idEstudiante = 442;
        this.tipeExamen = 0;
        this.dateInit = '2019-02-27';
        this.dateFin = '2019-03-28';
        this.imprimirTipo();
        this.impirmircursos(this.idEstudiante, this.tipeExamen, this.dateInit, this.dateFin);
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
        //     this._academiSrv.geListaEstados().subscribe((res: any) => {
        //         this.Estado = res.data;
        //     })
        this._academiSrv.geListaTipos().subscribe((res: any) => {
            this.Tipo = res.data;
        })
    }
    impirmircursos(idEstudiante, tipeExamen, dateInit, dateFin) {
        console.log(dateInit, dateFin);
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
        // swal('Entrar!', 'Desea empezar examen?', 'success').then(() => { 
        //     this._router.navigate(['/Academia/Cursos',id,name]);
        // });


        swal({
            title: "Empezar examen?",
            text: "¿DESEA EMPEZAR EL " + name + '? TIENES ' + time + ':00 MINUTOS',
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    this._router.navigate(['/Academia/Cursos', id, name]);
                } else {
                    swal("Cancelado!");
                }
            });
    }
}
