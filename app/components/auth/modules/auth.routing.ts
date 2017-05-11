
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import * as components from '../index';

export const authRoutes: Routes = [
    { path: 'login', component: components.LoginModalComponent, outlet: 'auth' },
    { path: 'signup', component: components.RegistrateModalComponent, outlet: 'auth' }
]

@NgModule({
    imports: [
        RouterModule.forChild(authRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AuthRouteModule { }