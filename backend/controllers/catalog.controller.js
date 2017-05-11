

const mongoose = require("mongoose");

const db = require("../libs/connectDb");
const collection = db.collection("catalog");

require("../models/catalog.model");



const Product = mongoose.model("Product");

const counter = require("./counters.controller");

function getAllCatalog() {
    return collection.find({});
}

function getFindOneProduct(product_id) {

    var params = {
        _id: Number(product_id)
    }
    var query = collection.findOne(params);

    if (query != null) {
        return query;
    }

}

function addProductToCatalog() {

}

function deleteOneProduct(product_id) {
    var params = {
        _id: Number(product_id)
    }
    var query = collection.remove(params);

    if (collection.remove(params))
        return query;
    else
        return false;
}

function createNewProduct(newProduct) {
    const product = new Product(newProduct);

    return product.save();

}

module.exports = {
    getAllCatalog,
    getFindOneProduct,
    addProductToCatalog,
    deleteOneProduct,
    createNewProduct
};
