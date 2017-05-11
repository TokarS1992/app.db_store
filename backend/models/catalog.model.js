"use strict"

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CatalogSchema = new Schema({

    _id: Number,
    title: String,
    brand: String,
    price: Number,
    shoesize: Array,
    imagePath: Array,
    description: String,
    details: Array,
    date: Date

})

module.exports = mongoose.model("Product", CatalogSchema);