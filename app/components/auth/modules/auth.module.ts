
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from '../../modal/module/modal.module';
// import { HttpModule } from '@angular/http';

import { AuthRouteModule } from './auth.routing';
import * as components from '../index';
import * as services from '../../../services/index';
import * as sharedService from '../services/index';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        ModalModule,
        AuthRouteModule
    ],
    exports: [
        components.LoginModalComponent,
        components.RegistrateModalComponent,
        components.IdentificationComponent
    ],
    declarations: [
        components.LoginModalComponent,
        components.RegistrateModalComponent,
        components.IdentificationComponent
    ],
    providers: [
        services.HttpService,
        services.HttpAuthService,
        services.GuardAuth,
        sharedService.UpdateStatusLogin
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class AuthModule { }