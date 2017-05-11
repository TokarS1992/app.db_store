
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgModel } from '@angular/forms';
 
@Component({
    selector: 'admin-page',
    templateUrl: './admin.component.html',
    moduleId: module.id
})

export class AdminComponent {

    constructor(private route: Router, private routeAct: ActivatedRoute ) {

    }
    
    ngOnInit() {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
    }

}