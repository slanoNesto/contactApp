var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');

var PORT = 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

/*CONTACT LIST*/
app.get('/contactList', function(req, res){
    db.contactlist.find(function(err, docs){
        console.log(docs);
        res.json(docs);
    });
});
app.post('/contactList', function(req, res){
    console.log(req.body);
    db.contactlist.insert(req.body, function(err, doc){
        res.json(doc);
    });
});
app.delete('/contactList/:id', function(req, res){
    var id = req.params.id;
    db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
        res.json(doc);
    });
});
app.put('/contactList/:id', function(req, res) {
    var id = req.params.id;
    db.contactlist.findAndModify({
        query: {_id: mongojs.ObjectId(id)},
        update: {$set: {
            name: req.body.name,
            email: req.body.email,
            number: req.body.number
        }},
        new: true}, function(err, doc) {
            res.json(doc);
        });
});

app.listen(PORT);
console.log('Server running on port ' + PORT + '. (and also Veverchina says hello!)');
