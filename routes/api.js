/*
 * Serve JSON to our AngularJS client
 */
'use strict';
var mongoose = require('mongoose');


var Schema = mongoose.Schema;
var CtaSchema = new Schema({
    name    : String,
    link    : String,
    source  : String
});

var Cta = mongoose.model('Cta', CtaSchema);

exports.ctas = function (req, res) {
    Cta.find(function (err, ctas, count) {
        if (err) return console.error(err);
        res.json({
            "ctalist" : ctas
        });
    });
};

exports.cta = function (req, res) {
    var oid = mongoose.Types.ObjectId('56d6169e177f3b3e70d4f436');
    Cta.findOne({'_id': oid}, function (err, cta, count) {
        if (err) return console.error(err);
        res.json({
            "cta" : cta
        });
    });
};