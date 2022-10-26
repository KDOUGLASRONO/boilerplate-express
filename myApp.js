require('dotenv').config();
let express = require('express');
let app = express();

//app.use(express.static(__dirname + "/public"));
//serving a static assets(photos,styles,etc);
app.use('/public', express.static(__dirname + "/public"));

//also works
//app.use('/public/style.css', express.static(__dirname + "/public/style.css"));
//app.use("/public/photos", express.static(__dirname + "/public/photos"));
//also works
//app.use('/public/style.css', express.static(__dirname + "/public/style.css"));

//Implement a Root-Level Request Logger Middleware
app.use(function(req,res,next){
    //we haven't added path so it runs on all directories
    console.log(req.method, req.path, " - ", req.ip);
    next();
})

//to run on root directory only
app.use("/", function(req,res,next){
    console.log(req.method, req.path, " - ", req.ip);
    next();
})

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
    //console.log(process.env.MESSAGE_STYLE);
    if(process.env.MESSAGE_STYLE==="uppercase"){
        console.log(process.env.MESSAGE_STYLE);
        return res.json({"message":"HELLO JSON"});
    }
    else{
        return res.json({"message":"Hello json"});
    }
});
//chain middleware and create a timeserver, chaining functions
function timeNow(){
    return new Date().toString();
}
app.get("/now",function(req,res,next){
    req.time = timeNow();
    next();
},
    function(req,res){
        res.json({time: req.time});
    }
);
//get route parameter input from the client
app.get("/:word/echo",function(req,res){
    res.json({echo: req.params.word});
    //res.json({echo: req.params}) ==>> res {"echo":{"word":"word","echo":"echo"}}
});

































 module.exports = app;
