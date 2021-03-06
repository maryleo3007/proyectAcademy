import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsComponent } from './components.component';
import { MatDialogModule } from '@angular/material/dialog';

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
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlComponent } from './control/registro/control.component';
import { AsistenciaComponent } from './control/asistencia/asistencia.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { VentanaComponent } from './control/asistencia/ventana/ventana.component';
import { AcademyCoursesComponent } from './academy/courses/courses.component';
import { AcademyCourseComponent } from './academy/course/course.component';
import { PreguntasComponent } from './academy/preguntas/preguntas.component';
import { ActivoPipe } from 'app/pipes/activo.pipe';
import { PreguntaFormComponent } from './academy/pregunta-form/pregunta-form.component';
import { AlternativasComponent } from './academy/alternativas/alternativas.component';
import { AlternativaFormComponent } from './academy/alternativa-form/alternativa-form.component';
import { NotasComponent } from './academy/notas/notas.component';
import { NullPipe } from 'app/pipes/null.pipe';
import { NotaFormComponent } from './academy/nota-form/nota-form.component';
import { RespuestasComponent } from './academy/respuestas/respuestas.component';
import { PerfilComponent } from 'app/shared/perfil/perfil.component';
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
    ContactsContactFormDialogComponent,
    PreguntaFormComponent,
    VentanaComponent,
    AlternativaFormComponent,
    NotaFormComponent

  ],
  declarations: [
    ActivoPipe,
    NullPipe,

    PerfilComponent,

    AcademyCoursesComponent,
    AcademyCourseComponent,
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
    VentanaComponent,
    PreguntasComponent,
    PreguntaFormComponent,
    AlternativasComponent,
    AlternativaFormComponent,
    NotasComponent,
    NotaFormComponent,
    RespuestasComponent

  ],
  entryComponents: [
    ContactsContactFormDialogComponent,
    VentanaComponent,
    PreguntaFormComponent,
    AlternativaFormComponent,
    NotaFormComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ComponentsModule { }
