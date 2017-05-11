
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GuardAuth } from '../../../services/checkAuth/checkAuth.service';

import * as adminComp from '../index';

export const routesAdmin: Routes = [
    { path: 'admin', component: adminComp.AdminComponent, canActivate: [GuardAuth] },
    { path: 'admin/main',component: adminComp.AdminMainComponent, canActivate: [GuardAuth] },
    { path: 'admin/create', component: adminComp.ProductFormComponent, canActivate: [GuardAuth] }
];

@NgModule({
    exports: [
        RouterModule
    ],
    imports: [
        RouterModule.forChild(routesAdmin)
    ],
    providers: [ GuardAuth ]
})

export class RoutingAdmin { }