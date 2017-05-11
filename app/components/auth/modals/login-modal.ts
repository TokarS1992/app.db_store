
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'angular-2-local-storage';
import { Subscription } from 'Rxjs';
import * as services from '../../../services/index';
import * as sharedService from '../services/index';

import { errorMessage, IErrorsAuth } from '../errors/errors';
import { validLengthField } from '../../../models/auth/auth.interface';

@Component({
    selector: "login-modal",
    templateUrl: "./login-modal.html",
    moduleId: module.id
})

export class LoginModalComponent implements OnInit, OnDestroy {

    private formLog: FormGroup;
    private serverMessage: string;
    private errors: IErrorsAuth = errorMessage;
    private logStatus: boolean;
    private subscriptions: Subscription[] = [];

    constructor(
        private httpAuth: services.HttpAuthService,
        private subscriptionService: services.SubscriptionService,
        private fb: FormBuilder,
        private storageService: LocalStorageService,
        private changeLog: sharedService.UpdateStatusLogin
    ) { }

    ngOnInit() {
        this.formLog = this.fb.group({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern('[a-zA-Z0-9._-]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}')
            ]),
            password: new FormControl(null, [
                Validators.required,
                Validators.minLength(validLengthField.password[0])
            ])
        })
    }

    private onSubmit() {
        let data = this.formLog.value;
         const loginCheck = this.httpAuth.authentificated(data)
            .subscribe(res => {
                if (!res.userPass) {
                    this.logStatus = false;
                    this.serverMessage = res.message;
                    this.formLog.reset();
    
                    setTimeout(() => {
                        this.serverMessage = null;
                    }, 5000)

                } else {
                    this.formLog.reset();
                    // this.storageService.set("currentUser", JSON.stringify(res.data));
                    this.changeLog.changeStatus(true, res.data);
                }
        });
        this.subscriptions.push(loginCheck);
    }

    ngOnDestroy() {
        this.subscriptionService.unsubscribeFromAllObservables(this.subscriptions);
    }

}