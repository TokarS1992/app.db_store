
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as components from '../components/index';

const routesApp: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/home' },
    { path: 'home', component: components.HomeComponent },
    { path: 'catalog', component: components.CatalogComponent },
    // Categories
    { path: 'catalog/martins', component: components.CatMartins },
    { path: 'catalog/vans', component: components.CatVans },
    { path: 'catalog/fila', component: components.CatFila },
    // Preview product
    { path: 'catalog/:id', component: components.ProductItemPreview },
    //404
    { path: '**', component: components.NotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot( routesApp, { useHash: true } )
    ],
    exports: [
       RouterModule
    ]
})

export class RoutingModule { }