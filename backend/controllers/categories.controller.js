"use strict";

const db = require("../libs/connectDb");
const collection = db.collection("categories");

function getAllCategories() {
    return collection.find({});
}


module.exports = {
    getAllCategories,

};