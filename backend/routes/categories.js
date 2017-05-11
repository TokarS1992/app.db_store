const express = require("express");
const apiRoute = express.Router();

const controllerCategories = require("../controllers/categories.controller");

apiRoute.get("/categories", (req, res) => {
    controllerCategories.getAllCategories().toArray()
        .then(categories => {
            res.json({
                success: true,
                message: "Categories successfuly send on the client!",
                data: categories
            })
        })
        .catch(error => {
            res.json({
                success: false,
                message: "Categories not response on the client" + error,
                data: []
            })
        })
});

module.exports = apiRoute;