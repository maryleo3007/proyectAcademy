import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { EvaluacionesService, CalendarioService, SucursalService } from 'app/servicios/servicio.index';
import { fuseAnimations } from '@fuse/animations';
import { DOCUMENT } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { NotaFormComponent } from '../nota-form/nota-form.component';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class NotasComponent implements OnInit {
  verCalendario = false;
  accounts: object;
  sucursales: any;
  public term: any;
  sucursal: any;
  semanas: any;
  fechainicio: string;
  fechafin: string;
  p = 1;

  lunesNew: { id: number; record: { monday: { dayName: string; date: string; score: string } } };

  notas = [
    {
      id: 1539,
      fullName: 'ANDERSON HINOSTROZA SALVATIERRA',
      branchOfficeId: 1,
      classRoomId: 1,
      record: {
        monday: {
          'dayName': 'Lunes',
          'date': '25/03/2019',
          'score': '16.4'
        },
        tuesday: {
          'dayName': 'Martes',
          'date': '26/02/2019',
          'score': '18'
        },
        wednesday: {
          'dayName': 'Miercoles',
          'date': '27/03/2019',
          'score': '10.5'
        },
        thursday: {
          'dayName': 'Jueves',
          'date': '28/03/2019',
          'score': '09'
        },
        friday: {
          'dayName': 'Viernes',
          'date': '29/03/2019',
          'score': '14'
        },
        saturday: {
          'dayName': 'Sabado',
          'date': '30/03/2019',
          'score': '17'
        },
        sunday: {
          'dayName': 'Domingo',
          'date': '31/03/2019',
          'score': null
        }
      }
    },
    {
      id: 1287,
      fullName: 'JAVIER JAIME VILCHES',
      branchOfficeId: 1,
      classRoomId: 1,
      record: {
        monday: {
          'dayName': 'Lunes',
          'date': '25/03/2019',
          'score': '16.4'
        },
        tuesday: {
          'dayName': 'Martes',
          'date': '26/02/2019',
          'score': '18'
        },
        wednesday: {
          'dayName': 'Miercoles',
          'date': '27/03/2019',
          'score': '13.3'
        },
        thursday: {
          'dayName': 'Jueves',
          'date': '28/03/2019',
          'score': '10'
        },
        friday: {
          'dayName': 'Viernes',
          'date': '29/03/2019',
          'score': '0'
        },
        saturday: {
          'dayName': 'Sabado',
          'date': '30/03/2019',
          'score': null
        },
        sunday: {
          'dayName': 'Domingo',
          'date': '31/03/2019',
          'score': '13'
        }
      }
    },
    {
      id: 1543,
      fullName: 'JHUNIOR HUAMAN ORE',
      branchOfficeId: 1,
      classRoomId: 5,
      record: {
        monday: {
          'dayName': 'Lunes',
          'date': '25/03/2019',
          'score': '11.4'
        },
        tuesday: {
          'dayName': 'Martes',
          'date': '26/02/2019',
          'score': '15.4'
        },
        wednesday: {
          'dayName': 'Miercoles',
          'date': '27/03/2019',
          'score': '10.5'
        },
        thursday: {
          'dayName': 'Jueves',
          'date': '28/03/2019',
          'score': '10'
        },
        friday: {
          'dayName': 'Viernes',
          'date': '29/03/2019',
          'score': null
        },
        saturday: {
          'dayName': 'Sabado',
          'date': '30/03/2019',
          'score': '16'
        },
        sunday: {
          'dayName': 'Domingo',
          'date': '31/03/2019',
          'score': '14'
        }
      }
    },
    {
      id: 1545,
      fullName: 'DAVID HUAMANCCATO CCOSCA',
      branchOfficeId: 1,
      classRoomId: 2,
      record: {
        monday: {
          'dayName': 'Lunes',
          'date': '25/03/2019',
          'score': '16.4'
        },
        tuesday: {
          'dayName': 'Martes',
          'date': '26/02/2019',
          'score': '12.5'
        },
        wednesday: {
          'dayName': 'Miercoles',
          'date': '27/03/2019',
          'score': '13.3'
        },
        thursday: {
          'dayName': 'Jueves',
          'date': '28/03/2019',
          'score': '11'
        },
        friday: {
          'dayName': 'Viernes',
          'date': '29/03/2019',
          'score': '0'
        },
        saturday: {
          'dayName': 'Sabado',
          'date': '30/03/2019',
          'score': '13'
        },
        sunday: {
          'dayName': 'Domingo',
          'date': '31/03/2019',
          'score': '14'
        }
      }
    }
  ]

  constructor(
    @Inject(DOCUMENT) private _document,
    private _CalendarioSrv: CalendarioService,
    private _sucursalSrv: SucursalService,
    private _EvaluationSrv: EvaluacionesService,
    private _matDialog: MatDialog
  ) {
    this.term = ''
    //  this.notas = new Array<any>();

  }

  ngOnInit() {

    this.imprimirCalendario();
  }
  imprimirCalendario() {
    this._CalendarioSrv.getCalenadrio().subscribe((res: any) => {
      // console.log(res);    
      this.accounts = res.data;
    });
    this._sucursalSrv.getSucursales().subscribe((res: any) => {
      // console.log(res);
      this.sucursales = res.data;
    });
  }
  selectSucursal(sucursal) {
    this.sucursal = sucursal.id;
  }
  selectClick(mes: any) {
    this.verCalendario = true;
    this.semanas = mes.weeks;

  }
  SemanaSeleccionada(semana, link: any) {
    let selectores: any = this._document.getElementsByClassName('selector');
    for (let ref of selectores) {
      ref.classList.remove('colorAzul')
    }
    link.classList.add('colorAzul');
    this.fechainicio = 'startDate=' + this.cambiarfecha(semana.startDate);
    this.fechafin = 'endDate=' + this.cambiarfecha(semana.endDate);
  }
  cambiarfecha(fecha) {
    var aperturaanio = String(fecha);
    var apertura_dia = aperturaanio.substr(0, 2);
    var apertura_mes = aperturaanio.substr(3, 2);
    var apertura_anio = aperturaanio.substr(6, 4);
    return apertura_anio + '-' + apertura_mes + '-' + apertura_dia;
  }

  EditNotas(nota, dia, name) {
    const dialogRef = this._matDialog.open(NotaFormComponent, {
      panelClass: 'contact-form-dialog',
      width: '50%',
      data: {
        id: nota.id,
        fullName: nota.fullName,
        dia: dia,
        name: name
      }
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (!res) {
        return;
      }
      console.log(res);
    });
  }
  ChangeNotas(nota, datos, link) {
    this.lunesNew = { id: null, record: { monday: { dayName: '', date: '', score: '' } } };
    this.lunesNew.id = nota.id;
    this.lunesNew.record.monday.dayName = datos.dayName;
    this.lunesNew.record.monday.date = datos.date;
    let selectores: any = this._document.getElementsByClassName('selector1');
    for (let ref of selectores) {
      ref.classList.remove('colorVerde')
    }
    link.classList.add('colorVerde');
  }
  onEnter(value) {
    this.lunesNew.record.monday.score = value;
    console.log(this.lunesNew);

  }

}
