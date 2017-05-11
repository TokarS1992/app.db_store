
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Subscription } from 'Rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import * as services from '../../../services/index';

import { errorMessage, IErrorsAuth } from '../errors/errors';
import { validLengthField } from '../../../models/auth/auth.interface';

@Component({
    selector: "registrate-modal",
    templateUrl: "./reg-modal.html",
    moduleId: module.id
})

export class RegistrateModalComponent implements OnInit, OnDestroy {
    
    private formReg: FormGroup;
    private serverMessage: string;
    // Check new User
    private newUserStatus: boolean = false;
    private subscriptions: Subscription[] = [];

    private errors: IErrorsAuth = errorMessage;

    constructor(
        private fb: FormBuilder,
        private httpAuth: services.HttpAuthService, 
        private authGuard: services.GuardAuth,
        private subscriptionService: services.SubscriptionService,
        private _router: Router,
        private location: Location
    ) {}
    
    ngOnInit() {
        this.formReg = this.fb.group({
            name: new FormControl(null, [
                Validators.required,
                Validators.minLength(validLengthField.name[0]),
                Validators.maxLength(validLengthField.name[1])
            ]),
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern('[a-zA-Z0-9._-]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}')
            ]),
            password: new FormControl(null, [
                Validators.required,
                Validators.minLength(validLengthField.password[0])
            ])
        });

    }
    
    private onSubmit() {
        let data = this.formReg.value;
        if (this.formReg.valid) {
            const authSubscription = this.httpAuth.registrate(data)
                .subscribe(res => {
                    if (res.success) {
                        if (res.newUser) {
                        
                            // this.authGuard.setStatus(res.newUser);
        
                            // Clear form
                            this.formReg.reset();

                            this.newUserStatus = res.newUser;
                            this.serverMessage = res.message;
                            
                            this.resetMessage();

                            this._router.navigateByUrl( this.location.path().replace("signup", res.redirectTo) );
        
                        } else {
                            this.newUserStatus = res.newUser;
                            this.serverMessage = this.formReg.get("email").value + ". " + res.message;
                            // Clear e-mail,pass fields
                            this.formReg.patchValue({email: null, password: null});
                        }
                    }
            });

            this.subscriptions.push(authSubscription);

        } else {
            this.newUserStatus = false;
            this.serverMessage = "Please fill all required fields";
            this.resetMessage();
        }
    }

    public resetMessage() {
        setTimeout(() => { 
            this.serverMessage = null;
        }, 5000);
    }

    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptionService.unsubscribeFromAllObservables(this.subscriptions);
        }
    }
 
}