import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';
import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { ServiceModule } from './servicios/servicio.module';
import { APP_ROUTES } from './app.routes';
import { LoginModule } from './shared/login/login.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from './components/components.module';
import { AuthService } from './core/auth.service';
import { AuthGuard } from './core/auth.guard';
import { TokenStorage } from './core/token.storage';
import { Interceptor } from './core/app.interceptor';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
// import { PerfilComponent } from './shared/perfil/perfil.component';


@NgModule({
    declarations: [
        AppComponent,
        // PerfilComponent,

    ],
    imports: [
        Ng2SearchPipeModule,
        NgxPaginationModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        TranslateModule.forRoot(),
        MatMomentDateModule,
        MatButtonModule,
        MatIconModule,
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,
        LayoutModule,
        SampleModule,
        ServiceModule,
        APP_ROUTES,
        LoginModule,
        ComponentsModule,
    ],
    providers: [
        AuthService,
        AuthGuard,
        TokenStorage,
        TokenStorage,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: Interceptor,
            multi: true
        }

    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
