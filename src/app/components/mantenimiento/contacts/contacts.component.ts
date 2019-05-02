import { Component, ViewEncapsulation, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { ContactsContactFormDialogComponent } from './contact-form/contact-form.component';
import { FormControl } from '@angular/forms';
import { AlumnoService, ProfesorService } from 'app/servicios/servicio.index';
import { PersonaModel } from 'app/models/persona.model';
import { ContactsContactListComponent } from './contact-list/contact-list.component';

declare var swal: any;
@Component({
    selector: 'contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ContactsComponent implements OnInit {
    @ViewChild(ContactsContactListComponent) hijo: ContactsContactListComponent;
    progreso1: any;
    public isValid: boolean = true;
    private message: string = '';
    persona: PersonaModel;
    @Input() tipo;
    id: 0;
    name = '';
    lastName = '';
    email = '';
    cellphone = '';
    address = '';
    birthday = '';
    classRoom = '';
    documentType = '';
    documentNumber = '';
    dialogRef: any;
    hasSelectedContacts: boolean;
    searchInput: FormControl;

    public listapersona: any;
    valor1: any;
    secondLastName: any;
    element: any;
    separar: any;
    gender: any;

    constructor(
        private _alumnoSrv: AlumnoService,
        private _profeSrv: ProfesorService,
        private _matDialog: MatDialog,
    ) {
        if (sessionStorage.getItem('persona')) {
            this.persona = JSON.parse(sessionStorage.getItem('persona'));
        } else {
            this.persona = new PersonaModel();
        }

    }

    ngOnInit(): void {

    }

    eliminar() {
        if (this.progreso1) {
            swal({
                title: "Desea eliminar?",
                text: "Esta seguro de eliminar!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        this._alumnoSrv.deleteAlumno(this.progreso1).subscribe(res => {
                            this.hijo.imprimirlista(this.tipo);
                            console.log(res);
                        })
                        swal("Eliminado!", {
                            icon: "success",
                        });
                    } else {
                        swal("Cancelado!");
                    }
                });
        } else {
            swal(`Seleccione ${this.tipo} para eliminar!`);
        }

    }


    newContact(): void {
        this.dialogRef = this._matDialog.open(ContactsContactFormDialogComponent, {
            panelClass: 'contact-form-dialog',
            width: '50%',
            data: {
                action: 'new',
                tipo: this.tipo,
                id: this.id,
                name: this.name,
                lastName: this.lastName,
                secondLastName: this.secondLastName,
                email: this.email,
                cellphone: this.cellphone,
                address: this.address,
                birthday: this.birthday,
                gender: this.gender,
                documentNumber: this.documentNumber,
            }
        });

        this.dialogRef.afterClosed().subscribe((res: any) => {
            if (!res) {
                return;
            }
            this.persona.id = res.id;
            this.persona.name = res.name;
            this.persona.lastName = res.lastName;
            this.persona.email = res.email;
            this.persona.cellphone = res.cellphone;
            this.persona.secondLastName = res.secondLastName,
                this.persona.address = res.address;
            this.persona.birthday = res.birthday;
            this.persona.gender = res.gender;
            this.persona.documentNumber = res.documentNumber;
            this.persona.branchOffice = res.branchOffice;
            this.saveOrUpdatePersona();

        });
    }



    saveOrUpdatePersona(): void {

        if (this.tipo === 'Alumno') {
            this.persona.documentType = 'DNI';
            if (this.isValid) {
                this._alumnoSrv.saveOrUpdateAlumno(this.persona).subscribe(res => {
                    if (res !== null) {
                        this.listapersona = res.data;
                        this.hijo.imprimirlista(this.tipo);
                    } else {
                        this.message = res.message;
                        this.isValid = false;
                    }
                });
            } else {
                this.message = 'Los campos con * son obligatorios';
            }
            sessionStorage.clear();
        }
        if (this.tipo === 'Profesor') {
            this.persona.documentType = 'DNI';
            if (this.isValid) {
                this._profeSrv.saveOrUpdateProfesor(this.persona).subscribe(res => {
                    if (res !== null) {
                        console.log(this.listapersona);
                        this.hijo.imprimirlista(this.tipo);
                    } else {
                        this.message = res.message;
                        this.isValid = false;
                    }
                });
            } else {
                this.message = 'Los campos con * son obligatorios';
            }
            sessionStorage.clear();
        }

    }


}
