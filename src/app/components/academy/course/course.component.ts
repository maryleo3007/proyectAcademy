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
    course: any;
    courseStepContent: any;
    currentStep: number;

    @ViewChildren(FusePerfectScrollbarDirective)
    fuseScrollbarDirectives: QueryList<FusePerfectScrollbarDirective>;

    // Private
    private _unsubscribeAll: Subject<any>;
    preguntas: any;
    descritionExamen: any;
    titulo = 'prueba'
    ExamenDescip: any;
    PreguntasDescip: any;

    laspreguntas: Array<any>;
    public cursos: CursospModel;
    favoriteSeason: any
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
        this.PreguntasDescip = new PreguntaDescripModel();
        // Set the defaults
        this.animationDirection = 'none';
        this.currentStep = 0;
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.cursos = new CursospModel();

        this.laspreguntas = [
            {
                id: 200011,
                title: 'HISTORIA DEL PERU I',
                pregunta: "¡El señor de Sipan, fue un gobernante de la cultura ........., cuya tumba fue descubierta y escabada por ........?",
                type: "CBBX-1",
                image: "https://s3.amazonaws.com/imagenessofia/imagen1.jpg",
                estatusId: 1,
                time: 30,
                alternatives: [
                    {
                        id: ' 2000111-a',
                        description: "caral - Alba Jose"
                    },
                    {
                        id: ' 2000111-b',
                        description: "Moche - Alba Walter"
                    },
                    {
                        id: ' 2000111-c',
                        description: "caral - Chimú - Alba Walter"
                    },
                    {
                        id: '2000111-d',
                        description: "caral - Lambayeque - Alba Luis"
                    },
                    {
                        id: '2000111-e',
                        description: "caral - Huaca Sikan - Alba Walter"
                    }
                ],
                response: {
                    id: null
                }
            },
            {
                id: 200012,
                title: 'HISTORIA DEL PERU II',
                pregunta: "¡El señor de Sipan, fue un gobernante de la cultura ........., cuya tumba fue descubierta y escabada por ........?",
                type: "CBBX-2",
                image: "assets/images/cards/card1.jpg",
                estatusId: 1,
                alternatives: [
                    {
                        id: ' 2000111-a',
                        description: "caral - Alba Jose"
                    },
                    {
                        id: ' 2000111-b',
                        description: "Moche - Alba Walter"
                    },
                    {
                        id: ' 2000111-c',
                        description: "caral - Chimú - Alba Walter"
                    },
                    {
                        id: '2000111-d',
                        description: "caral - Lambayeque - Alba Luis"
                    },
                    {
                        id: '2000111-e',
                        description: "caral - Huaca Sikan - Alba Walter"
                    }
                ],
                response: {
                    id: null
                }
            },
            {
                id: 200013,
                title: 'HISTORIA DEL PERU III',
                pregunta: "¡El señor de Sipan, fue un gobernante de la cultura ........., cuya tumba fue descubierta y escabada por ........?",
                type: "CBBX-3",
                image: "https://s3.amazonaws.com/imagenessofia/imagen1.jpg",
                estatusId: 1,
                alternatives: [
                    {
                        id: ' 2000111-a',
                        description: "caral - Alba Jose"
                    },
                    {
                        id: ' 2000111-b',
                        description: "Moche - Alba Walter"
                    },
                    {
                        id: ' 2000111-c',
                        description: "caral - Chimú - Alba Walter"
                    },
                    {
                        id: '2000111-d',
                        description: "caral - Lambayeque - Alba Luis"
                    },
                    {
                        id: '2000111-e',
                        description: "caral - Huaca Sikan - Alba Walter"
                    }
                ],
                response: {
                    id: null
                }
            },
            {
                id: 200014,
                title: 'HISTORIA DEL PERU IV',
                pregunta: "¡El señor de Sipan, fue un gobernante de la cultura ........., cuya tumba fue descubierta y escabada por ........?",
                type: "CBBX-4",
                image: "https://s3.amazonaws.com/imagenessofia/imagen1.jpg",
                estatusId: 1,
                alternatives: [
                    {
                        id: ' 2000111-a',
                        description: "caral - Alba Jose"
                    },
                    {
                        id: ' 2000111-b',
                        description: "Moche - Alba Walter"
                    },
                    {
                        id: ' 2000111-c',
                        description: "caral - Chimú - Alba Walter"
                    },
                    {
                        id: '2000111-d',
                        description: "caral - Lambayeque - Alba Luis"
                    },
                    {
                        id: '2000111-e',
                        description: "caral - Huaca Sikan - Alba Walter"
                    }
                ],
                response: {
                    id: null
                }
            }
            ,
            {
                id: 200015,
                title: 'HISTORIA DEL PERU V',
                pregunta: "¡El señor de Sipan, fue un gobernante de la cultura ........., cuya tumba fue descubierta y escabada por ........?",
                type: "CBBX-5",
                image: "https://s3.amazonaws.com/imagenessofia/imagen1.jpg",
                estatusId: 1,
                alternatives: [
                    {
                        id: ' 2000111-a',
                        description: "caral - Alba Jose"
                    },
                    {
                        id: ' 2000111-b',
                        description: "Moche - Alba Walter"
                    },
                    {
                        id: ' 2000111-c',
                        description: "caral - Chimú - Alba Walter"
                    },
                    {
                        id: '2000111-d',
                        description: "caral - Lambayeque - Alba Luis"
                    },
                    {
                        id: '2000111-e',
                        description: "caral - Huaca Sikan - Alba Walter"
                    }
                ],
                response: {
                    id: null
                }
            },
            {
                id: 200016,
                title: 'HISTORIA DEL PERU VI',
                pregunta: "¡El señor de Sipan, fue un gobernante de la cultura ........., cuya tumba fue descubierta y escabada por ........?",
                type: "CBBX-6",
                image: "https://s3.amazonaws.com/imagenessofia/imagen1.jpg",
                estatusId: 1,
                alternatives: [
                    {
                        id: ' 2000111-a',
                        description: "caral - Alba Jose"
                    },
                    {
                        id: ' 2000111-b',
                        description: "Moche - Alba Walter"
                    },
                    {
                        id: ' 2000111-c',
                        description: "caral - Chimú - Alba Walter"
                    },
                    {
                        id: '2000111-d',
                        description: "caral - Lambayeque - Alba Luis"
                    },
                    {
                        id: '2000111-e',
                        description: "caral - Huaca Sikan - Alba Walter"
                    }
                ],
                response: {
                    id: null
                }
            }

        ]


    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // this.minutos = 
        console.log(this.laspreguntas.length);

        this.cursos.totalSteps = this.laspreguntas.length;
        // const dato = this._route.snapshot.paramMap.get('historial');
        const dato = this._route.snapshot.paramMap.get('id');
        // console.log(dato);
        this.obtenerExamen(dato);
        // this.course = this.prueba;
        // console.log(this.course);

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
            this.preguntas = res.data.questions;
            this.descritionExamen = res.data;
            this.ExamenDescip = res.data.questions;
            this.PreguntasDescip = res.data.questions.questionDetail;
            console.log(this.descritionExamen);
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
        // pregunta.response.id = alternativa.id;
        // this.devolver = pregunta;
        // for (let entry of this.laspreguntas) {
        // if (entry.id === pregunta.id)

        this.laspreguntas.map(function (dato) {
            if (dato.id === pregunta.id) {
                dato.response.id = alternativa.id;
            }
            return dato;
        });
        //  }

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
        if (this.currentStep === this.cursos.totalSteps - 1) {
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
