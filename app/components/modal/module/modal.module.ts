
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as components from '../index';
import * as services from '../../../services/index';

@NgModule({
    exports: [
        components.ModalComponent,
        components.ModalCont,
        components.ModalHead
    ],
    imports: [
        CommonModule
    ],
    declarations: [
        components.ModalComponent,
        components.ModalCont,
        components.ModalHead
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ModalModule { }