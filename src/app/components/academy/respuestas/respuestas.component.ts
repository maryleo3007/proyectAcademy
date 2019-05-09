import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

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
  respuestas = [
    {
      id: 47,
      evaluationId: 3,
      title: "PREGUNTA 1",
      description: "Decripción de la pregunta 1",
      answers: [
        {
          id: 165,
          questionId: 47,
          description: "Ayacucho",
          isAnswer: true,
          isMarked: true
        },
        {
          id: 166,
          questionId: 47,
          description: "Lima",
          isAnswer: false,
          isMarked: false

        },
        {
          id: 167,
          questionId: 47,
          description: "Cuzco",
          isAnswer: false,
          isMarked: false
        },
        {
          id: 168,
          questionId: 47,
          description: "Prueba",
          isAnswer: false,
          isMarked: false
        },
        {
          id: 169,
          questionId: 47,
          description: "Puno",
          isAnswer: false,
          isMarked: false
        },
        {
          id: 170,
          questionId: 47,
          description: "Puno",
          isAnswer: false,
          isMarked: false
        },
        {
          id: 171,
          questionId: 47,
          description: "Iquitos",
          isAnswer: false,
          isMarked: false
        }
      ]
    },
    {
      id: 58,
      evaluationId: 3,
      title: "PREGUNTA 2",
      description: "Decripción de la pregunta 2",
      answers: [
        {
          id: 201,
          questionId: 58,
          description: "Ayacucho",
          isAnswer: false,
          isMarked: false
        },
        {
          id: 202,
          questionId: 58,
          description: "Lima",
          isAnswer: false,
          isMarked: true
        },
        {
          id: 203,
          questionId: 58,
          description: "Cuzco",
          isAnswer: true,
          isMarked: false
        }
      ]
    }
  ]


  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
  ) {
    this.currentStep = 0;
    this.animationDirection = 'none';
    this.paginador = this.respuestas.length;
  }

  ngOnInit() {
  }
  salirdelExamen() {

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
    console.log('salir');
  }
}
