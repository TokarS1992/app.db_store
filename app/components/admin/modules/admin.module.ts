
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingAdmin } from './admin.routing';

import * as adminComp from '../index';

@NgModule({
    imports: [
        CommonModule,
        RoutingAdmin
    ],
    exports: [
        adminComp.AdminComponent,
        adminComp.AdminMainComponent
    ],
    declarations: [
        adminComp.AdminComponent,
        adminComp.AdminMainComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class AdminModule { }