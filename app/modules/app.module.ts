
import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { HttpModule } from '@angular/http';
import { LocalStorageModule } from 'angular-2-local-storage';

// Modules
import { RoutingModule } from './app.routing';
import { AdminModule } from '../components/admin/modules/admin.module';
import { FilterModule } from '../components/filter/module/filter.module';
import { AuthModule } from '../components/auth/modules/auth.module';
import { ModalModule } from '../components/modal/module/modal.module';

// All services and all components
import * as components from '../components/index';
import * as services from '../services/index';

import {bootstrap} from "@angular/upgrade/src/angular_js";

@NgModule({
    declarations: [
        // Main Component
        components.AppComponent,
        // Pages
        components.HomeComponent,
        components.CatalogComponent,
        components.NotFoundComponent,
        components.ProductItemPreview,
        // Navigate
        components.HeadNavigateComponent,
        components.FootNavigateComponent,
        // Catagories
        components.CatMartins,
        components.CatFila,
        components.CatVans,

        //Product Form
        components.ProductFormComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        AdminModule,
        FilterModule,
        ModalModule,
        AuthModule,
        RoutingModule,
        LocalStorageModule.withConfig({
            prefix: 'app',
            storageType: 'localStorage'
        })
    ],
    providers: [
        services.HttpService,
        services.HttpAuthService,
        services.TitleService,
        services.SubscriptionService,
        services.GuardAuth
    ],
    bootstrap: [
        components.AppComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class AppModule {}