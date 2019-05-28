import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { EvaluacionesService } from 'app/servicios/servicio.index';

@Component({
  selector: 'app-respuestas',
  templateUrl: './respuestas.component.html',
  styleUrls: ['./respuestas.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class RespuestasComponent implements OnInit {
  currentStep: number;
  paginador: number;
  animationDirection: 'left' | 'right' | 'none';

  respuestas: Array<any>;
  idEstudiante: number;
  idpregunta: string;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _EvaluationSrv: EvaluacionesService,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {
    this.paginador = 1;
    this.currentStep = 0;
    this.animationDirection = 'none';
    this.idEstudiante = parseInt(localStorage.getItem('idusuario'));
  }

  ngOnInit() {
    this.idpregunta = this._route.snapshot.paramMap.get('id');
    this.imprimirRespuestas();
  }
  salirdelExamen() {
    this._router.navigate(['/Academia/Cursos']);
  }
  imprimirRespuestas() {
    this._EvaluationSrv.getListaRespuestas(this.idEstudiante, this.idpregunta).subscribe((res: any) => {
      this.respuestas = res;
      this.paginador = this.respuestas.length;
    });
  }


  gotoNextStep(step): void {

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
  enviarResultado() {
    this._router.navigate(['/Academia/Cursos']);
  }
  gotoStep(step): void {
    // Decide the animation direction
    // this.marcado = this.respuestas[step].answerId;
    this.animationDirection = this.currentStep < step ? 'left' : 'right';

    // Run change detection so the change
    // in the animation direction registered
    this._changeDetectorRef.detectChanges();

    // Set the current step
    this.currentStep = step;
  }
}
