import { ChangeDetectorRef, Component, OnDestroy, OnInit, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { AcademiService } from 'app/servicios/servicio.index';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademiModel, PreguntaDescripModel, CursospModel } from 'app/models/academi.model';
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
    respuestas: Array<RespuestasModel>;
    // respuestas: Array<any>;
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
    public cursos: CursospModel;
    favoriteSeason: any
    paginador: number;
    Titulo: string;
    intervalo: NodeJS.Timer;
    respositori: RespuestasModel;
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
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseSidebarService: FuseSidebarService
    ) {
        // this.minutos = 1;
        this.respositori = new RespuestasModel();
        this.respuestas = new Array({ id_pregunta: 0, id: 0, description: 'xxxxx' });
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
        const dato = this._route.snapshot.paramMap.get('id');
        this.Titulo = this._route.snapshot.paramMap.get('nombre');
        this.minutos = parseInt(this._route.snapshot.paramMap.get('time'));
        this.obtenerExamen(dato);
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
            this.paginador = this.laspreguntas.length;
            for (let i = 0; i < this.laspreguntas.length; i++) {
                const respo = new RespuestasModel()
                respo.id_pregunta = i;
                respo.id = 0;
                respo.description = 'x';
                this.respuestas[i] = respo;
            }

        });
        // console.log(this.respuestas);

    }
    // window.onhashchange = function () {
    //     console.log('hola');

    // }
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
        this.laspreguntas.map(function (dato: any) {
            if (dato.id === pregunta.id) {
                dato.response = alternativa;
            }
            return dato;
        });
        // console.log(alternativa, pregunta);
        const respo = new RespuestasModel()
        respo.id_pregunta = pregunta.id;
        respo.id = alternativa.id;
        respo.description = alternativa.description;
        this.respuestas[i] = respo;
        // for (let respuesta of this.respuestas) {

        //     if (respuesta.id_pregunta === pregunta.id) {
        //         // this.respuestas.map(function (dato: any) {
        //         //     if (dato.id_pregunta === pregunta.id) {
        //         //         const date = [pregunta.id, alternativa]
        //         //         console.log(date);

        //         //         // dato = date;
        //         //     }
        //         //     return dato;
        //         // });
        //     } else {
        //         this.respuestas.push(alternativa);

        //     }
        // }
        // console.log(this.respuestas);


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
    gotoNextStep(step): void {
        this.marcado = this.respuestas[step].description;
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
        this.marcado = this.respuestas[step].description;
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
        console.log(this.laspreguntas);
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
                    this._router.navigate(['/Academia/Cursos'])
                } else {
                    swal("Cancelado!");
                }
            });
    }
}
export class RespuestasModel {
    id_pregunta: number;
    id: number;
    description: string;
}