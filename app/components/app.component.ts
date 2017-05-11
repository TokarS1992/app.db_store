
import { Component } from '@angular/core';

@Component({
    selector: 'app-store',
    templateUrl: './app.component.html',
    moduleId: module.id
})

export class AppComponent {
    
    private header: boolean = true;
    private footer: boolean = true;

    ngOnInit() {

    }
    
    fadeNav() {
        this.header = false;
        this.footer = false;
    }
}