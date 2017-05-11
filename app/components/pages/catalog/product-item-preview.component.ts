
import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { Subscription } from 'Rxjs';

import * as services from '../../../services/index';

import { IProduct } from "../../../models/product";


@Component({
    selector: 'product-item-preview',
    templateUrl: './product-item-preview.html',
    moduleId: module.id
})

export class ProductItemPreview implements OnInit, OnDestroy, IProduct {

     public _id: number;
     public title: string;
     public brand: string;
     public price: number;
     public shoesize: number[];
     public imagePath: string[];
     public description: string;
     public details: Array<string>;
     public date: Date;

     private previewItem: IProduct;
     private subscriptions: Subscription[] = [];

     constructor(
         private httpService: services.HttpService,
         private subscription: services.SubscriptionService,
         private route: ActivatedRoute
     ){}

     ngOnInit() {
          const routerSubscription = this.route.params.subscribe(params => {

               let id = params["id"];

               const apiServiceSubscription = this.httpService
                   .getProductById(id)
                   .subscribe(res => {

                            if(res.success){
                                
                                let datas = new Object();
                                 for (let key in res.data) {
                                     datas[key] = key == "imagePath" ? [res.data[key]] : res.data[key]
                                 }

                                this.previewItem = Object.assign(datas, this.previewItem);
                                
                                Object.assign(this, this.previewItem);
                            }
                       },
                       error => console.error(`An error has occurred!`+ error));
               this.subscriptions.push(apiServiceSubscription);
          });

          this.subscriptions.push(routerSubscription);
     }

     public ngOnDestroy(): void {
          this.subscription.unsubscribeFromAllObservables(this.subscriptions);
     }
}