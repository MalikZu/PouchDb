var PouchDB = require('pouchdb');
var express = require('express');
var app = express();
var cors= require('cors');

PouchDB.plugin(require('pouchdb-find'));

// // // app.use('/db', require('express-pouchdb')(PouchDB));
app.set('port', (process.env.PORT || 8080));
var _app = require('express-pouchdb')({
  mode: 'fullCouchDB',
  overrideMode: {
    include: ['routes/fauxton']
  }
});

var temp = PouchDB.defaults({prefix:'./db_files'});

_app.setPouchDB(temp);
app.use(cors(

{
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204,
  "allowedHeaders":['Content-Type']
}

    ));
app.use('/db',_app);




var db = new temp('B');
// // db.createIndex({
// //     index:{
// //         fields:['_id']
// //     }
// // }).then(result=>{
// //     db.getIndexes().then(result=>{
// //         db.deleteIndex(result.indexes[0]).then(result=>{
// //             console.log(result);
// //         });
// //     });
// // });

app.listen(app.get('port'),()=>{
    console.log("PORT: " + app.get('port'));
});