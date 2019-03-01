import { ChangeDetectorRef, Component, OnDestroy, OnInit, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { AcademiService } from 'app/servicios/servicio.index';
import { ActivatedRoute } from '@angular/router';
import { AcademiModel, PreguntaDescripModel, CursospModel } from 'app/models/academi.model';

@Component({
    selector: 'academy-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AcademyCourseComponent implements OnInit, OnDestroy {
    minutos: number;
    segundos: number;
    devolver: any;
    animationDirection: 'left' | 'right' | 'none';
    currentStep: number;

    @ViewChildren(FusePerfectScrollbarDirective)
    fuseScrollbarDirectives: QueryList<FusePerfectScrollbarDirective>;

    // Private
    private _unsubscribeAll: Subject<any>;
    descritionExamen: any;
    ExamenDescip: any;

    laspreguntas: Array<any>;
    public cursos: CursospModel;
    favoriteSeason: any
    paginador: number;
    /**
     * Constructor
     *
     * @param {AcademyCourseService} _academyCourseService
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {FuseSidebarService} _fuseSidebarService
     */
    constructor(
        private _route: ActivatedRoute,
        private _academiSrv: AcademiService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseSidebarService: FuseSidebarService
    ) {
        this.minutos = 29;
        this.segundos = 59;
        setInterval(() => this.tick(), 1000);
        this.descritionExamen = new AcademiModel();

        // Set the defaults
        this.animationDirection = 'none';
        this.currentStep = 0;
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
        // console.log(this.laspreguntas.length);
        //this.paginador = this.laspreguntas.length;
        const dato = this._route.snapshot.paramMap.get('id');
        this.obtenerExamen(dato);
    }
    tick(): void {
        if (--this.segundos < 0) {
            this.segundos = 59;
            if (--this.minutos < 0) {
                this.minutos = 0;
                this.segundos = 0;
            }
        }
    }
    obtenerExamen(id) {
        this._academiSrv.getExamenesxId(id).subscribe((res: any) => {
            this.laspreguntas = res;
            this.paginador = this.laspreguntas.length;
        });
    }

    /**
     * After view init
     */


    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    onSelectionChangeRadio(alternativa: any, pregunta: any) {
        this.laspreguntas.map(function (dato) {
            if (dato.id === pregunta.id) {
                dato.response.id = alternativa.id;
            }
            return dato;
        });

    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Go to step
     *
     * @param step
     */
    gotoStep(step): void {
        // Decide the animation direction
        this.animationDirection = this.currentStep < step ? 'left' : 'right';

        // Run change detection so the change
        // in the animation direction registered
        this._changeDetectorRef.detectChanges();

        // Set the current step
        this.currentStep = step;
    }

    /**
     * Go to next step
     */
    gotoNextStep(): void {
        if (this.currentStep === this.paginador - 1) {
            return;
        }
        // Set the animation direction
        this.animationDirection = 'left';
        // Run change detection so the change
        // in the animation direction registered
        this._changeDetectorRef.detectChanges();
        // Increase the current step
        this.currentStep++;
    }
    /**
     * Go to previous step
     */
    gotoPreviousStep(): void {
        if (this.currentStep === 0) {
            return;
        }
        // Set the animation direction
        this.animationDirection = 'right';

        // Run change detection so the change
        // in the animation direction registered
        this._changeDetectorRef.detectChanges();

        // Decrease the current step
        this.currentStep--;
    }

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
    enviarResultado() {
        console.log(this.laspreguntas);
    }
}
