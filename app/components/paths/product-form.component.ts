
import {Component, Input, OnDestroy, OnInit, Output,EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router }  from '@angular/router';

import { Product}   from "../../models/product";

interface IForm{
    title:string;
    brand:string;
    price:string;
    // image:string[],
}

@Component({
    selector: 'product-form',
    templateUrl: './product-form.component.html',
    moduleId: module.id
})
export class ProductFormComponent implements OnInit,OnDestroy {

    @Input() private action: string;
    @Input() private itemToAdd: Product;
    @Output() private formSubmit = new EventEmitter<Product>();

    private productForm: FormGroup;
    private initVal: IForm = {
        title: '',
        brand: '',
        price: '',
        // image: '',
    };
    private isSubmitted = false;

    constructor(private  formBuilder: FormBuilder, private router: Router) {
        
    }

    ngOnInit(): void {

        switch (this.action) {
            case 'update':
                if (!!this.itemToAdd) {
                    this.initVal = {
                        title: (this.itemToAdd.title),
                        brand: (this.itemToAdd.brand),
                        price: String(this.itemToAdd.price),
                        // image: this.itemToAdd.imagePath

                    };
                } else {
                    console.error("No item passed!");
                }
                break;
            case 'create':
            default:
        }

        //init form
        this.productForm = this.formBuilder.group({
            title: [this.initVal.title, Validators.required],
            brand: [this.initVal.brand, Validators.required],
            price: [this.initVal.price, [Validators.required, Validators.pattern(ProductFormComponent.pricePattern)]],
            // image: [this.initVal.image, [Validators.required, Validators.pattern(ProductFormComponent.imageUrlPattern)]],

        })
    }

    ngOnDestroy(): void {
        this.productForm = null;
    }


    private static pricePattern = "^([1-9]|[0-9][0-9]|[0-9][0-9][0-9]|[0-9][0-9][0-9][0-9])$";
    private static imageUrlPattern = "(https?:\/\/.*\.(?:png|jpg|jpeg|gif))";

    //
    // private isValidFormField(field:string): boolean {
    //     return this.productForm.controls[field].valid || (this.productForm.controls[field].pristine && !this.isSubmitted);
    // }


    private submit(): void {
        this.isSubmitted = true;

         {

            const formData = this.productForm.value;

            const newProduct: Product = Object.assign({}, formData, {

            });

            //Emitting the event
            this.formSubmit.emit(newProduct);
        }
    }


    private cancel() {
        if (this.productForm.pristine || confirm("Are you sure that you want to quit? All the data will be lost.")) {
            this.router.navigate(['/admin']);
        }
    }
}