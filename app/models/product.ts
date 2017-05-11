
export class Product {

    constructor(
        public _id: number,
        public title: string,
        public brand: string,
        public price: number,
        public shoesize: number[],
        public imagePath: string[],
        public description: string,
        public details: Array<string>,
        public date: Date
    ) {}
}

export interface IProduct {
    _id: number,
    title: string,
    brand: string,
    price: number,
    shoesize: number[],
    imagePath: string[],
    description: string,
    details: Array<string>,
    date: Date
}
