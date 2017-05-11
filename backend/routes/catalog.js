const express = require("express");
const apiRoute = express.Router();

const controllerCatalog = require("../controllers/catalog.controller");

const mongoose = require('mongoose');

const Product = mongoose.model("Product")

apiRoute.get("/catalog", (req, res) => {
    controllerCatalog.getAllCatalog().toArray()
        .then(catalog => {
            res.json({
                success: true,
                message: "Catalog successfuly send on the client!",
                data: catalog
            })
        })
        .catch(error => {
            res.json({
                success: false,
                message: "Catalog not responce of the client :(" + error,
                data: []
            })
        })
});

apiRoute.get("/catalog/:id", (req, res) => {
    let id_product = req.params.id;
    controllerCatalog.getFindOneProduct(id_product)
        .then(product_item => {
            res.json({
                success: true,
                message: "Product item responced on client!",
                data: product_item
            })
        })
        .catch(error => {
            res.json({
                success: false,
                message: "Product item not responced on client :(" + error,
                data: []
            })
        })

});

apiRoute.delete("/catalog/delete", (req, res) => {

    let productId = req.body.productId;

    controllerCatalog.deleteOneProduct(productId)
        .then(check => {
            res.json({
                success: true,
                message: "Product successfuly deleted",
                data: []
            })
        })
        .catch(error => {
            res.json({
                success: false,
                message: "Product not deleted",
                data: []
            })
        })
});

apiRoute.post("/catalog/create", (request, response) => {

    const newProduct = request.body;

    if (newProduct) {
        controllerCatalog.createNewProduct(newProduct)
            .then(check => {
                res.json({
                    success: true,
                    message: "Product added",
                    data: []
                })
            })
            .catch(error => {
                res.json({
                    success: false,
                    message: "Product not added",
                    data: []
                })
            })
    }
});

module.exports = apiRoute;