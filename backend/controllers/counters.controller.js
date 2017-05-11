

const db = require("../libs/connectDb");
const collection = db.collection("counters");

function getNextCount(name) {
    collection.findAndModify({
        query: { _id: name },
        update: { $ins: { seq: 1 } },
        new: true
    });

    return collection.seq;
}

module.exports = {
    getNextCount
};