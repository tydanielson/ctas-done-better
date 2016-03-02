/*
 * Serve JSON to our AngularJS client
 */

exports.ctas = function (req, res) {
    var db = req.db;
    var collection = db.get('ctas');
    collection.find({}, {}, function (e, docs) {
        res.json({
            "ctalist" : docs
        });
    });

};