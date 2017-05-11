
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as services from '../../../services/index';

import { Subscription } from 'Rxjs';

@Component({
    selector: 'header-navigate',
    templateUrl: './header.html',
    moduleId: module.id
})

export class HeadNavigateComponent implements OnInit {
    
    private categories: Object[];
    private subscriptions: Subscription[] = [];

    constructor(
        private httpService: services.HttpService,
        private subscription: services.SubscriptionService
    ) {}
    
    ngOnInit() {
         let checkSubscribe = this.httpService.getAllCategories()
            .subscribe((res) => {
                if ( res.success ) {
                    this.categories = res.data;
                }
            })
        this.subscriptions.push(checkSubscribe);
    }

    ngOnDestroy() {
        this.subscription.unsubscribeFromAllObservables(this.subscriptions);
    }
}