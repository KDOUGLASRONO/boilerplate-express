let express = require('express');
let app = express();

//app.use(express.static(__dirname + "/public"));
app.use('/public', express.static(__dirname + "/public"));
console.log("Hello World");
/*app.get("/", function(req,res){
  res.send("Hello Express");
});
*/
app.get("/", function(req,res){
    res.sendFile(__dirname + "/views/index.html");
})




































 module.exports = app;
