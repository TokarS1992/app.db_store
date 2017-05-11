import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'Rxjs';
import { Router } from '@angular/router';

import * as services from '../../../services/index';
import {Product} from "../../../models/product";

import { FilterComponent } from '../../filter/filter.component';


interface IdataParams {
    productId: number
}


@Component({
    selector: 'page-category',
    templateUrl: './catalog-items.html',
    host: {
        '(document:scroll)': 'scroll()'
    },
    moduleId: module.id
})

export class CatalogComponent implements OnInit, OnDestroy {
    
    public catalog: Product[] = [];
    private subscriptions: Subscription[] = [];
    
    @ViewChild("filter") private filter: FilterComponent;
    @ViewChild("wrap") private wrapCatalog: any;

    constructor(
        private httpService: services.HttpService,
        private subscription: services.SubscriptionService,
        private router: Router,
    ) { }

    ngOnInit() {

        let checkSubscribe: Subscription = this.httpService
            .getAllCatalog()
            .subscribe( (res) => {
                if ( res.success ) {
                    let data = res.data;
                    for( let count = 0; count < data.length; count++ ) {
                        this.catalog.push( data[count] )
                    }
                }
            });
        this.subscriptions.push(checkSubscribe);
    }
    
    public changeProducts(val: Product[]) {
        this.catalog = val;
    }
    
    private scroll() {
        if ( this.filter.checkFixed )
            this.wrapCatalog.nativeElement.classList.add("marginLeft");
        else
            this.wrapCatalog.nativeElement.classList.remove("marginLeft");
    }

    public preview(id: number): void {
        this.router.navigate(['/catalog', id]);
    }

    public deleteProduct(id: number) {
        let data: IdataParams = {
            productId: id

        };
        let deleteProduct: Subscription = this.httpService
            .deleteProductById(data)
            .subscribe((res) => {
                let pos: number;
                if (res.success) {
                    for( let product of this.catalog ) {
                        if ( product._id == data.productId ) {
                            pos = (this.catalog.indexOf(product));
                            this.catalog.splice(pos, 1);
                            return true;
                        }
                    }
                }
                this.subscriptions.push(deleteProduct);
            });
    }
    
    ngOnDestroy() {
        this.subscription.unsubscribeFromAllObservables(this.subscriptions);
    }
}
