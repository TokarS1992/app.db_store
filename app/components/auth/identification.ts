
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { LocalStorageService } from 'angular-2-local-storage';
import { Subscription } from 'Rxjs';

import * as services from '../../services/index';
import * as sharedService from './services/index';

@Component({
    selector: 'identification',
    templateUrl: './identification.html',
    moduleId: module.id
})

export class IdentificationComponent implements OnInit { 

    constructor(
        private _router: Router,
        private location: Location,
        private storageServise: LocalStorageService,
        private changeLog: sharedService.UpdateStatusLogin,
        private authHttp: services.HttpAuthService
    ) { }

    public currnetPath: string;
    private viewUserLogin: boolean = false;
    private logInfo: any;

    ngOnInit() {
        const changeLogSubscribe: Subscription = this.changeLog.newStatus
            .subscribe( (data: Array<any> ) => {
                this.viewUserLogin = data[0];
                this.logInfo = data[1];
        })
        const getSession = this.authHttp
            .getSession()
            .subscribe(res => {
                if ( res.authenticated ) {
                    this.viewUserLogin = true;
                    this.logInfo = res.data;
                }
            })
    }

    public openAuth(navigateTo:string) {
        let currentPath: string = this.location.path();
        let urlPath: string = currentPath + "(auth:"+ navigateTo +")";
        this._router.navigateByUrl(urlPath).then(url => {
            if (url) {
                this.currnetPath = currentPath;
            }
        })
        .catch(err => {
            if (err) {
                throw new Error("Bad url path!");
            }
        })
    }

    private logOut() {
        this.authHttp.logout()
            .subscribe( res => {
                if (res.success) {
                    this.viewUserLogin = false;
                    this.logInfo = null;
                }
        })
    }

}