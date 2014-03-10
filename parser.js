var ADD_NEW_ITEM = "addItem";
var ADD_ITEMS_LIST = "saveSongList";
var GET_NEXT_ITEM = "getNextItem";


var dbHelper = require("./dbHelper");
var parse = function (method, data, callback)
{
    if (method == "get")
    {
         console.log("data is " + data);
           //convert string to json
          //var dataJson = JSON.parse(data);
          var requestHeader = data.header;
          console.log("header is " + requestHeader);
          var jsonResponseData = {};
          switch (requestHeader)
          {
              case GET_NEXT_ITEM:
                  jsonResponseData.header = GET_NEXT_ITEM;
                     dbHelper.getNextItem( function(err, item){
                         if (err){
                             jsonResponseData.ok = "0";
                         }
                         else
                         {
                              jsonResponseData.ok = "1";
                              jsonResponseData.item = item;
                         }
                         callback(jsonResponseData);
                       
                     }) ;
                       break;
         
              default:
                jsonResponseData.ok = "0";
                callback(jsonResponseData);
                break;
                       
                  
          }
    }
    else { //POST
        console.log("data is " + data);
           //convert string to json
          //var dataJson = JSON.parse(data);
          var requestHeaderPost = data.header;
          console.log("header is " + requestHeaderPost);
          var jsonResponseDataPost = {};
          switch (requestHeaderPost){
              case ADD_NEW_ITEM:
                  jsonResponseDataPost.header = ADD_NEW_ITEM;
                  dbHelper.saveNewSong(data.link, data.name, data.type, function(err, song){
                      if (err){
                          jsonResponseDataPost.ok = "0";
                      }
                      else {
                          jsonResponseDataPost.ok = "1";
                          jsonResponseDataPost.song = song;
                      }
                      callback(jsonResponseDataPost);
                  });
                  break;
              case ADD_ITEMS_LIST:
                   jsonResponseDataPost.header = ADD_ITEMS_LIST;
                     var items =  JSON.parse(data.items);
                   dbHelper.saveListOfItems(items, function(itemsNotSavedFlag, err){
                       if (err){
                           jsonResponseDataPost.ok = "0";
                       }
                       else {
                           jsonResponseDataPost.ok = "1";
                       }
                       callback(jsonResponseDataPost);
                   });
                   break;
             case "test":
                       console.log("test worked");
                       break;
            
            default:
                jsonResponseDataPost.ok = "0";
                callback(jsonResponseDataPost);
                break;
          }
        
    }
    
};

module.exports.parse = parse;
   
  