/*
 * Serve JSON to our AngularJS client
 */
'use strict';
var mongoose = require('mongoose');


var Schema = mongoose.Schema;
var CtaSchema = new Schema({
    name    : String,
    desc    : String,
    source  : String,
    css     : String
});

var Cta = mongoose.model('Cta', CtaSchema);

exports.allCtas = function (req, res) {
    Cta.find(function (err, ctas, count) {
        if (err) return console.error(err);
        res.json({
            "ctalist" : ctas
        });
    });
};

exports.cta = function (req, res) {
    var oid = mongoose.Types.ObjectId(req.params.id);
    Cta.findOne({'_id': oid}, function (err, cta, count) {
        if (err) return console.error(err);
        res.json({
            "cta" : cta
        });
    });
};

exports.createcta = function (req, res) {
    var tempcta = new Cta(
        { 
            name : req.body.name,
            desc : req.body.desc,
            source : req.body.source,
            css : req.body.css
        });
    tempcta.save(function(err) {
        if(err) throw err;
        console.log('Saved new cta');
    });
};

exports.updatecta = function (req, res) {
    var oid = mongoose.Types.ObjectId(req.body._id);
    Cta.findOneAndUpdate(
        {
            '_id': oid
        }, 
        {
            name: req.body.name,
            desc : req.body.desc,
            source : req.body.source,
            css : req.body.css
        },
        function(err) {
            if (err) throw err;
        });
};

exports.deletecta = function (req, res) {
    var oid = mongoose.Types.ObjectId(req.params.id);
    Cta.findOneAndRemove({'_id': oid}, function(err) {
      if (err) throw err;

      // we have deleted the user
      console.log('Cta deleted!');
    });
};