 
 import {Component, OnDestroy, OnInit} from '@angular/core';
 import {Product} from "../../../../models/product";
 import {Router} from "@angular/router";
 import {Subscription} from "Rxjs";

 import * as services from '../../../../services/index';

 @Component({
     selector: 'admin-main',
     templateUrl: './admin-main.component.html',
     moduleId: module.id
 })

 export class AdminMainComponent implements OnInit, OnDestroy {

     private subscriptions: Subscription[] = [];

     constructor(
         private httpService: services.HttpService,
         private router:Router,
         private subscibtionService: services.SubscriptionService,
     ){}
     private createProduct(product: Product){

         const httpServiceSubsciription = this.httpService
             .createNewProduct(product)
             .subscribe(response => {
                     if (response.success) {
                         console.log("ok")
                     }
                 }
             );
         this.subscriptions.push(httpServiceSubsciription);

     }

     ngOnInit() {
         // throw new Error('Method not implemented.');

     }

     ngOnDestroy() {

     }

 }

