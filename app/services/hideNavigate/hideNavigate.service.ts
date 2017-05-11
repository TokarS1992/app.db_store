
import { Injectable, Inject } from '@angular/core';
import { AppComponent } from '../../components/app.component';

@Injectable()
export class HideNavigateService {
    
    constructor( @Inject(AppComponent) private appComp: AppComponent ) {}

    hideNav() {
        this.appComp.fadeNav();
    }

}