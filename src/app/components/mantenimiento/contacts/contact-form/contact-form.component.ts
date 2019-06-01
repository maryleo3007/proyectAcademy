import { Component, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Contact } from '../contact.model';
import { OfficeService } from '../../../../servicios/office/office.service';
@Component({
    selector: 'contacts-contact-form-dialog',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ContactsContactFormDialogComponent implements OnInit {

    favoriteSeason: string;
    seasons: string[] = ['Masculino', 'Femenino'];
    officeList: any = [];
    action: string;
    contact: Contact;
    dialogTitle: string;
    tipo: any;
    itemselect: any;
    faltaNombre: boolean;
    faltaApellido: boolean;
    disable = true;

    constructor(
        private _officeService: OfficeService,
        public dialogRef: MatDialogRef<ContactsContactFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        console.log(data);
        this.disable = true
        this.action = data.action;
        this.tipo = data.tipo;
        if (data.gender) {
            if (data.gender === 'F')
                this.itemselect = 'Femenino';
            else if (data.gender === 'M') {
                this.itemselect = 'Masculino';
            }
        }
        if (this.action === 'edit') {
            this.dialogTitle = 'Editar ' + this.tipo;
        }
        else {
            this.dialogTitle = 'Nuevo ' + this.tipo;
        }
    }
    ngOnInit() {
        this.faltaNombre = false;
        this.faltaApellido = false;
        this.getOffices()
    }

    // office list  
    getOffices() {
        this.officeList = [];
        this._officeService.getOffice().subscribe((data) => {
            this.officeList = data.data;
        });
    }
    radioclick(radio) {
        if (radio === "Femenino") {
            this.data.gender = "F"
        } else if (radio === "Masculino") {
            this.data.gender = "M"
        } else {
            this.data.gender = null;
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
    validacion() {
        if (this.data.name === '' || this.data.lastName === '' || this.data.secondLastName === '' || this.data.documentNumber === '') {
            this.disable = false;
        }
    }


}
