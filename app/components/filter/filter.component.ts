
import { Component, OnInit, OnDestroy, Inject, forwardRef, ElementRef, ViewChild } from '@angular/core';
import { CatalogComponent } from '../pages/catalog/catalog.component';
import { Subscription } from 'Rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import 'rxjs/add/operator/map';

// Services
import * as services from '../../services/index';
import { LocalStorageService } from 'angular-2-local-storage';

// Models
import { Product } from '../../models/product';

interface IFilterEvents {
    checkStorage(): void,
    checkBrand(brand: String): void,
    filterProduct(): void,
    sortProcuct(valueToSortBy: String, ascending: Boolean): void,
    checkScroll(): void
}

@Component({
    selector: 'filter',
    templateUrl: './filter.component.html',
    host: {
        '(document: scroll)': 'checkScroll()'
    },
    moduleId: module.id
})

export class FilterComponent implements OnInit, OnDestroy {

    private token: string = "app_token";
    
    products: Product[] = [];
    brands: Array<String> = [];
    selectedBrands: String[] = [];
    productFilter: Product[] = [];

    formFilter: FormGroup;
    
    public checkFixed: boolean = false;

    private subscriptions: Subscription[] = [];

    constructor(
        @Inject( forwardRef( () => CatalogComponent ) ) private catalog: CatalogComponent,
        private httpService: services.HttpService,
        private el: ElementRef,
        private subscriptionService: services.SubscriptionService,
        private storageService: LocalStorageService,
        private fb: FormBuilder
    ) {}
    
    ngOnInit() {
        
        // Set default prices

        this.formFilter = this.fb.group({
            from: new FormControl(0, [] ),
            to: new FormControl(3000, [] )
        });


        let checkSubscribe: Subscription = this.httpService
            .getAllCatalog()
            .subscribe( (res) => {
                if( res.success ) {
                    let data = res.data;
                    for( let product of data ) {
                        if (product.brand && this.brands.indexOf(product.brand) == -1)
                            this.brands.push(product.brand)
                    }
                    this.products = data;
                }
                this.subscriptions.push(checkSubscribe);
            });
        
        // Get localStorage data
        this.checkStorage();
    }
    
    private checkStorage() {
        let checkSrorage: any = this.storageService.get("filter");

        if ( checkSrorage != null ) {
            let parseStorage = JSON.parse(checkSrorage).filter;
            // this.selectedBrands = parseStorage.brands;
            this.formFilter.patchValue({
                from: parseStorage.price.from,
                to: parseStorage.price.to
            })
        }
    }

    // Add/remove brands of filter
    private checkBrand(brand: String) {
        let index = this.selectedBrands.indexOf(brand);
        if (index == -1)
            this.selectedBrands.push(brand);
        else
            this.selectedBrands = [...this.selectedBrands.slice(0, index), ...this.selectedBrands.slice(index+1)];
    }
    
    // Filter method
    private filterProduct() {

        this.productFilter = [];

        let from = this.formFilter.get("from").value ? this.formFilter.get("from").value : 0;
        let to = this.formFilter.get("to").value ? this.formFilter.get("to").value : 3000;

        for (let product of this.products) {
            let price = product.price;
            if ( this.selectedBrands.length > 0 ) {
                if (this.selectedBrands.indexOf(product.brand) != -1)
                    this.addProductToFilter(product, {price,from,to} )
            } else {
                this.addProductToFilter(product, {price,from,to} )
            }
        }
    
        // Check filter empty
        let filter = this.productFilter.length > 0 || this.selectedBrands.length > 0 ? this.productFilter : this.products;
        
        this.catalog.changeProducts(filter);
        

        let data: Object = {
            "filter": {
                "price": {
                    "from": from,
                    "to": to
                },
                "brands": this.selectedBrands
            }
        };
        
        this.storageService.set("filter",JSON.stringify(data));

    }

    // Add product to filter
    private addProductToFilter(product: Product, args: any): void {
        if ( args.price >= args.from && args.price <= args.to ) {
            this.productFilter.push(product);
        }
    }
    
    // SortingBy
    private sortProcuct(valueToSortBy: String, ascending: Boolean) {
        let bigger = 1,
            smaller = -1;
        if (!ascending)  {
            bigger = -1;
            smaller = 1;
        }

        if ( this.productFilter.length == 0) this.productFilter = this.products;

        if (valueToSortBy == 'price')
            this.productFilter.sort(
                (product1, product2) => (product1.price >= product2.price) ? bigger : smaller );
        this.catalog.changeProducts(this.productFilter);

    }
    
    // Fixed position filter 
    private checkScroll() {
        if ( document.body.scrollTop > this.el.nativeElement.offsetTop )
            this.checkFixed = true;
        else 
            this.checkFixed = false;
    }

    private checkInp(val: any) {
        // if ( val.value.match('/\+/g') ) {
        //     console.log('ok')
        // }
        if ( val.value < 0 ) {
            let opt = {};
            opt[val.name] = 0;
            this.formFilter.patchValue(opt);
        }
    }
    
    // Destroy subscribes
    ngOnDestroy() {
        this.subscriptionService.unsubscribeFromAllObservables(this.subscriptions);
    }

}