require('dotenv').config();
const bodyParser = require('body-parser');
let express = require('express');
let app = express();


//app.use(express.static(__dirname + "/public"));
//serving a static assets(photos,styles,etc);
app.use('/public', express.static(__dirname + "/public"));
//use body parser to pass POST request
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

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
//get query parameter input from client
//encode the data after the root path
 app.get("/name",function(req,res){
    var firstName = req.query.first;
    var lastName = req.query.last;
    //res.json({name:Object.values(req.query)}); trying out
    //res.json({name:req.query.first + " " + req.query.last}); also works
    res.json({name:`${firstName} ${lastName}`})
 });
 //get data from post request
 app.post("/name",function(req,res){
    var firstName = req.body.first;
    var lastName = req.body.last;

    res.json({name:firstName + " " + lastName});

 })
 
































 module.exports = app;
