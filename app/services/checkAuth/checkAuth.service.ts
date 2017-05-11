
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'Rxjs';

// Service check authUser
@Injectable()
export class GuardAuth implements CanActivate {
    
    private authStatus: boolean = false;

    constructor() {}

    setStatus(val: boolean) {
        this.authStatus = val;
    }

    canActivate(): Observable<boolean>|Promise<boolean>|boolean {
        // Some check future authentification
        return this.authStatus;
    }

}