import { Component, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Contact } from '../contact.model';

@Component({
    selector: 'contacts-contact-form-dialog',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ContactsContactFormDialogComponent implements OnInit {

    
    favoriteSeason: string;
    seasons: string[] = ['Masculino', 'Femenino'];
    
    
    action: string;
    contact: Contact;
    dialogTitle: string;
    tipo: any;
    itemselect: any;
    ;
    constructor(        
        public dialogRef: MatDialogRef<ContactsContactFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {        
        this.action = data.action;
        this.tipo = data.tipo;  
        if(data.gender){
            if(data.gender === 'F')
            this.itemselect = 'Femenino';
            else if (data.gender === 'M') {
                this.itemselect = 'Masculino';
            }
        }        
        if (this.action === 'edit') {
            this.dialogTitle = 'Editar '  +this.tipo;
        }
        else {
            this.dialogTitle = 'Nuevo ' +this.tipo;            
        }
    }
    ngOnInit() {        
    }   

    radioclick(radio) {
        if(radio === "Femenino"){
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

}
