var mongoose = require('mongoose');
var random = require('mongoose-random');

var uristring =
process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL ||
'mongodb://localhost/HelloMongoose';

var connectToDb = mongoose.connect(uristring, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + uristring);
  }
});


var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

/**
 *  define the schemas and modules of db
 * ******************************************
 * ******************************************
 * ******************************************
 **/
 
 //songs schema
 
 var itemsSchema = mongoose.Schema ({
   // userId: {type: Number, required: true }, //check if unique
    link: {type:String, require:true},
    name: {type: String, required: true},
    type: {type: String, required: true},
    like: {type: Number, default: 0},
    unlike: {type: Number, default: 0}
});
itemsSchema.plugin(random);
var items  = mongoose.model('items', itemsSchema);




exports.getNextItem = function (callback){
    items.findOne({name: "item"}, function (err, item) {
       if (err){
            console.log("dbHelper, getNextItem, error" + err);
           callback(err, -1);
       }
       else {
           if (item !== null){
            console.log("dbHelper, getNextItem, found an item" + item);
           callback(err, item);
           }
           else {
               console.log("dbHelper, getNextItem, found an item and he is null" + item);
               callback(err, -1);
           }
       }
   } );
};
    
    
//   items.findRandom(function (err, item) {
//       if (err){
//             console.log("dbHelper, getNextItem, error" + err);
//           callback(err, -1);
//       }
//       else {
//           if (item !== null){
//             console.log("dbHelper, getNextItem, found an item" + item);
//           callback(err, item);
//           }
//           else {
//               console.log("dbHelper, getNextItem, found an item and he is null" + item);
//               callback(err, -1);
//           }
//       }
//   } );
      
// };
    

var itemsNotSavedFlag;

exports.saveListOfItems = function(items, callback)
{
    console.log("save songs list db");
     itemsNotSavedFlag = 0;
     for (var i = 0; i < items.length; ++i) {
         console.log("dbHelper", "array object " + items[i].name);
         //find the artist
        saveNewItem(items[i].link, items[i].name, items[i].type,  callbackToAddSongArray);
    }
    
    if (itemsNotSavedFlag !== 0)
    {
        callback(itemsNotSavedFlag, true); //error accurd
    }
    else 
    {
        callback(itemsNotSavedFlag, false);
    }
     
};

var callbackToAddSongArray = function  (err, item){
            if (err)
            {
                console.log( "question couldn't save to db " + err + item);
                itemsNotSavedFlag++;
            }
};
 

var saveNewItem = function(link, name, type, callback)
{
    console.log("save new item db");
    //find the artist id
       var item = new items({link: link, name: name, type: type});
           item.save(function (err, item){
               if (err){
                   console.log("song couldnt saved saveNewSong");
                   callback(err, -1);
               }
               else
               {
                    console.log("item saved ,saveNewItem db");
                    callback(err, item);
               }
           });
       };
  

module.exports.saveNewItem = saveNewItem;
module.exports.connectToDb = connectToDb;


 
 
 
 
 