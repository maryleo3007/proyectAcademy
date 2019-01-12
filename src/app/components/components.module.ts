import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsComponent } from './components.component';
import {MatDialogModule} from '@angular/material/dialog';

import { RouterModule } from '@angular/router';
import { BienvenidoComponent } from './configuration/bienvenido/bienvenido.component';
import { AlumnoComponent } from './mantenimiento/alumno/alumno.component';
import { ProfesorComponent } from './mantenimiento/profesor/profesor.component';
import { ContactsComponent } from './mantenimiento/contacts/contacts.component';
import { ContactsContactListComponent } from './mantenimiento/contacts/contact-list/contact-list.component';
import { ContactsSelectedBarComponent } from './mantenimiento/contacts/selected-bar/selected-bar.component';
import { ContactsMainSidebarComponent } from './mantenimiento/contacts/sidebars/main/main.component';
import { ContactsContactFormDialogComponent } from './mantenimiento/contacts/contact-form/contact-form.component';
import {
  MatButtonModule, 
  MatCheckboxModule, 
  MatDatepickerModule, 
  MatFormFieldModule, 
  MatIconModule, 
  MatInputModule,   
  MatMenuModule, 
  MatRippleModule, 
  MatTableModule, 
  MatToolbarModule, 
  MatPaginatorModule,
  MatSelectModule
} from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlComponent } from './control/registro/control.component';
import { AsistenciaComponent } from './control/asistencia/asistencia.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import { VentanaComponent } from './control/asistencia/ventana/ventana.component';
@NgModule({
  imports: [
    Ng2SearchPipeModule,
    NgxPaginationModule,
    MatSelectModule,
    MatDialogModule,
    MatPaginatorModule,
    RouterModule,
    CommonModule,        
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatTableModule,
    MatToolbarModule,
    FuseSharedModule,
    FuseConfirmDialogModule,
    FuseSidebarModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    BienvenidoComponent,
    Ng2SearchPipeModule,
    NgxPaginationModule,   
    // PruebasComponent,
    ContactsContactFormDialogComponent,
    VentanaComponent
  ],
  declarations: [
    ComponentsComponent,
    BienvenidoComponent,
    AlumnoComponent,
    ProfesorComponent,
    ContactsComponent,
    ContactsContactListComponent,
    ContactsSelectedBarComponent,
    ContactsMainSidebarComponent,
    ContactsContactFormDialogComponent,
    ControlComponent,
    AsistenciaComponent,
    VentanaComponent
    
  ],
  entryComponents:[ContactsContactFormDialogComponent,VentanaComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ComponentsModule { }
