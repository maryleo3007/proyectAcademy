import { ChangeDetectorRef, Component, OnDestroy, OnInit, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { AcademiService, EvaluacionesService } from 'app/servicios/servicio.index';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademiModel } from 'app/models/academi.model';
declare var swal: any;

@Component({
    selector: 'academy-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AcademyCourseComponent implements OnInit, OnDestroy {
    marcado: any;
    respuestas: Array<any>;
    suscrition: Subscription;
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
    public cursos: any;
    favoriteSeason: any
    paginador: number;
    Titulo: string;
    intervalo: NodeJS.Timer;
    respositori: Array<any>;
    idEstudiante: number;
    respo: { questionId: any; answerId: number; };
    idpregunta: string;
    minutosysegundos: string;
    /**
     * Constructor     
     * @param {AcademyCourseService} _academyCourseService
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {FuseSidebarService} _fuseSidebarService
     */
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _academiSrv: AcademiService,
        private _EvaluationsSrv: EvaluacionesService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseSidebarService: FuseSidebarService
    ) {
        this.idEstudiante = parseInt(localStorage.getItem('idusuario'));
        this.respuestas = new Array({ questionId: 0, answerId: 0 });
        this.segundos = 59;
        this.intervalo = setInterval(() => this.tick(), 1000);
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
        this.idpregunta = this._route.snapshot.paramMap.get('id');
        this.Titulo = this._route.snapshot.paramMap.get('nombre');
        this.minutos = parseInt(this._route.snapshot.paramMap.get('time')) - 1;
        this.minutosysegundos = this._route.snapshot.paramMap.get('time');
        this.obtenerExamen(this.idpregunta);
    }

    tick(): void {
        if (--this.segundos < 0) {
            this.segundos = 59;
            if (--this.minutos < 0) {
                this.minutos = 0;
                this.segundos = 0;
                if (this.minutos === 0) {
                    clearInterval(this.intervalo)
                    this._router.navigate(['/Academia/Cursos']);
                }
            }
        }
    }
    obtenerExamen(id) {
        this._academiSrv.getExamenesxId(id).subscribe((res: any) => {
            this.laspreguntas = res;
            console.log(res);
            this.paginador = this.laspreguntas.length;
            for (let i = 0; i < this.laspreguntas.length; i++) {
                this.respo = { questionId: null, answerId: null };
                this.respo.questionId = null;
                this.respo.answerId = null;
                this.respuestas[i] = this.respo;
            }

        });
        // console.log(this.respuestas);

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
        clearInterval(this.intervalo);
    }
    onSelectionChangeRadio(alternativa: any, pregunta: any, i) {
        console.log(alternativa);

        this.laspreguntas.map(function (dato: any) {
            if (dato.id === pregunta.id) {
                dato.questions = alternativa;
            }
            return dato;
        });
        this.respo = { questionId: null, answerId: null };
        this.respo.questionId = pregunta.id;
        this.respo.answerId = alternativa.id;
        this.respuestas[i] = this.respo;
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
        this.marcado = this.respuestas[step].answerId;
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
    gotoNextStep(step): void {
        this.marcado = this.respuestas[step].answerId;
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
    gotoPreviousStep(step): void {
        this.marcado = this.respuestas[step].answerId;
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
    eventocambio(step) {
        console.log(step);
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
        const mandaRespuesta = { studentId: null, evaluationId: null, time: '', questions: null };
        mandaRespuesta.studentId = this.idEstudiante;
        mandaRespuesta.evaluationId = this.idpregunta;
        mandaRespuesta.time = this.minutosysegundos;
        mandaRespuesta.questions = this.respuestas;
        this._EvaluationsSrv.saveOrUpdateRespuestas(mandaRespuesta).subscribe(res => {
            console.log(res);
            if (res.code === 1) {
                swal('Bien!', 'Guardado!', 'success').then(() => {
                    this._router.navigate(['/Academia/Cursos']);
                });
            }
        });
    }
    salirdelExamen() {
        swal({
            title: "Salir del examen?",
            text: "Desea salir del examen? sus respuesta serán enviadas automaticamente",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    this.enviarResultado();
                    this._router.navigate(['/Academia/Cursos']);
                } else {
                    swal("Cancelado!");
                }
            });
    }
}
export class RespuestasModel {
    questionId: number;
    answerId: number;
}