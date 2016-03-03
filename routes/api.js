/*
 * Serve JSON to our AngularJS client
 */
'use strict';
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Cta = new Schema({
    name    : String,
    link    : String,
    source  : String
});

mongoose.model('Cta', Cta);

exports.ctas = function (req, res) {
    Cta.find(function (err, ctas, count) {
        if (err) return console.error(err);
        res.json({
            "ctalist" : ctas
        });
    });
};


// exports.ctas = function (req, res) {
//     var db = req.db;
//     var collection = db.get('ctas');
//     collection.find({}, {}, function (e, docs) {
//         res.json({
//             "ctalist" : docs
//         });
//     });
// };

// exports.cta = function (req, res) {
//     var db = req.db;
//     var collection = db.get('ctas');
//     collection.findById('56d6169e177f3b3e70d4f436', function (e, docs) {
//         res.json({
//             "cta" : docs
//         });
//     });
// };