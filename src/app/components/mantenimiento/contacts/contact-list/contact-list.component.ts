import { Component, OnInit, ViewChild, ViewEncapsulation, Input, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
//models
import { PersonaModel, IdModel } from '../../../../models/persona.model';
import { ContactsContactFormDialogComponent } from '../contact-form/contact-form.component';
//services
import { AlumnoService } from '../../../../servicios/alumno/alumno.service';
import { ProfesorService } from 'app/servicios/servicio.index';
import { SelectionModel } from '@angular/cdk/collections';
import { OfficeService } from '../../../../servicios/office/office.service';
declare var swal: any;

@Component({
  selector: 'contacts-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ContactsContactListComponent implements OnInit {

  // localId : IdModel;
  cambioLista: any
  public isValid: boolean = true;
  private message: string = '';
  persona: PersonaModel;
  selecteparticipaAct: Array<IdModel>;
  name = '';
  lastName = '';
  email = '';
  cellphone = '';
  address = '';
  birthday = '';
  classRoom = '';
  documentType = '';
  documentNumber = '';
  branchOffice = 0;
  @Input() tipo;
  @Input() listapersona;

  @Output('actualizaValor') cambioValor: EventEmitter<any> = new EventEmitter();

  selectedContacts: any[];
  checkboxes: {};

  ELEMENT_DATA1: Array<PersonaModel>;
  dialogRef: any;
  displayedColumns = ['select', 'documentNumber', 'name', 'email', 'cellphone', 'birthday'];
  dataSource = new MatTableDataSource<PersonaModel>(this.ELEMENT_DATA1);
  selection = new SelectionModel<PersonaModel>(true, []);

  listaEliminar: any;
  _id: number;
  editarPersona: any;
  officeList: any = [];
  studentList: any = [];
  filteredOfficeList: any = [];
  currentOffice: number;

  constructor(
    private _alumnoSrv: AlumnoService,
    private _profeSrv: ProfesorService,
    private _matDialog: MatDialog,
    private _officeService: OfficeService
  ) {
    this.currentOffice = 1
    if (sessionStorage.getItem('persona')) {
      this.persona = JSON.parse(sessionStorage.getItem('persona'));
    } else {
      this.persona = new PersonaModel();

      this.selecteparticipaAct = new Array<IdModel>();
    }
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.imprimirlista(this.tipo);
    this.ELEMENT_DATA1 = this.listapersona;
    this.dataSource.paginator = this.paginator;
    this.getOffices()

  }
  // office list  
  getOffices() {
    this.officeList = [];
    this._officeService.getOffice().subscribe((data) => {
      this.officeList = data.data;
    });
  }

  getStudents() {

    return this.studentList
  }

  filterbyOffice() {
    if (this.tipo === 'Alumno') {
      this._alumnoSrv.getStudents().subscribe((data) => {
        this.studentList = data.data;
      });
      setTimeout(() => {
        if (this.currentOffice == 0) {
          this.dataSource.data = this.studentList;
        } else {
          this.dataSource.data = this.studentList;
          this.dataSource.data = this.studentList.filter(data => data.branchOffice == this.currentOffice)
        }
      }, 1000);
    }
  }

  applyFilter(filterValue: string) {

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editar(contact: PersonaModel) {
    this._id = contact.id;
    this.dialogRef = this._matDialog.open(ContactsContactFormDialogComponent, {
      panelClass: 'contact-form-dialog',
      width: '50%',
      data: {
        action: 'edit',
        tipo: this.tipo,
        id: contact.id,
        name: contact.name,
        lastName: contact.lastName,
        secondLastName: contact.secondLastName,
        email: contact.email,
        cellphone: contact.cellphone,
        address: contact.address,
        birthday: contact.birthday,
        gender: contact.gender,
        documentNumber: contact.documentNumber,
        branchOffice: contact.branchOffice
      }
    });
    this.dialogRef.afterClosed().subscribe((res: any) => {
      if (!res) {
        return;
      }
      this.persona.id = res.id;
      this.persona.name = res.name;
      this.persona.lastName = res.lastName;
      this.persona.secondLastName = res.secondLastName;
      this.persona.email = res.email;
      this.persona.cellphone = res.cellphone;
      this.persona.address = res.address;
      this.persona.birthday = res.birthday;
      this.persona.gender = res.gender;
      this.persona.documentNumber = res.documentNumber;
      this.persona.branchOffice = res.branchOffice;
      this.saveOrUpdatePersona();
    });
  }

  imprimirlista(tipo: string) {
    if (tipo === 'Alumno') {
      this._alumnoSrv.getPersonaAlumno().subscribe((res: any) => {
        this.listapersona = res.data;
        console.log(res.data);
        this.displayedColumns = ['select', 'documentNumber', 'name', 'email', 'cellphone', 'birthday'];
        this.dataSource = new MatTableDataSource<PersonaModel>(this.listapersona);
        this.selection = new SelectionModel<PersonaModel>(true, []);
        this.dataSource.paginator = this.paginator;
      })
    }
    if (tipo === 'Profesor') {
      this._profeSrv.getPersonaProfesor().subscribe((res: any) => {
        this.listapersona = res.data;
        this.displayedColumns = ['select', 'documentNumber', 'name', 'email', 'cellphone', 'birthday'];
        this.dataSource = new MatTableDataSource<PersonaModel>(this.listapersona);
        this.selection = new SelectionModel<PersonaModel>(true, []);
        this.dataSource.paginator = this.paginator;
      })
    }
    return;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => {
        console.log(row);
        this.selection.select(row)
      });
  }

  eventCheckbox(event, contactId) {
    if (event.checked) {
      let localId = new IdModel();
      localId.id = contactId.id;
      this.selecteparticipaAct.push(localId);
      this.cambioValor.emit(this.selecteparticipaAct);
    } else {
      const elimanarcontac = this.selecteparticipaAct.findIndex(element => element.id === contactId.id);
      this.selecteparticipaAct.splice(elimanarcontac, 1);
      this.cambioValor.emit(this.selecteparticipaAct);
    }
  }

  saveOrUpdatePersona(): void {
    this.persona.documentType = 'DNI';
    if (this.tipo === 'Alumno') {
      if (this.isValid) {
        this._alumnoSrv.saveOrUpdateAlumno(this.persona).subscribe(res => {
          console.log(res);
          this.imprimirlista(this.tipo);
        });
      } else {
        this.message = 'Los campos con * son obligatorios';
      }
      sessionStorage.clear();
    }
    if (this.tipo === 'Profesor') {
      if (this.isValid) {
        this._profeSrv.saveOrUpdateProfesor(this.persona).subscribe(res => {
          this.imprimirlista(this.tipo);
        });
      } else {
        this.message = 'Los campos con * son obligatorios';
      }
      sessionStorage.clear();
    }
  }

}


