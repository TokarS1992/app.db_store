const db = require("./connectDB");
const config = require("../config");

function dropDB() {
    db.dropDatabase();
    console.log("db " + config.get("db:name") + " is dropped!");
    db.close();
}

dropDB();