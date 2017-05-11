
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import * as components from '../index';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule
    ],
    exports: [
        components.FilterComponent
    ],
    declarations: [
        components.FilterComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class FilterModule { }