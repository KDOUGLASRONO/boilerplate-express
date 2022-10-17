let express = require('express');
let app = express();

//app.use(express.static(__dirname + "/public"));
//serving a static assets(photos,styles,etc);
app.use('/public', express.static(__dirname + "/public"));
//also works
//app.use('/public/style.css', express.static(__dirname + "/public/style.css"));
console.log("Hello World");
/*app.get("/", function(req,res){
  res.send("Hello Express");
});
*/
app.get("/", function(req,res){
    res.sendFile(__dirname + "/views/index.html");
})
//serving a json file
app.get("/json",function(req,res){
    res.json({"message":"Hello json"});
})



































 module.exports = app;
