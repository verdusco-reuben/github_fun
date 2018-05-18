var express = require("express");
var path = require("path");
var app = express();
var bp = require("body-parser");
var port = 8000;
var session = require("express-session");
app.use(express.static(path.join(__dirname, "/dist/trello-clone")));
app.use(bp.urlencoded({extended:true}));
app.use(bp.json());
app.use(session({saveUninitialized:true,secret:"foobar",resave:true}));
require("./server/config/mongoose.js");
var routes_setter = require("./server/config/routes.js");
routes_setter(app);
//routing to "./dist/index.html" was giving error, ask Chase about it
// Error: ENOENT: no such file or directory, stat '/Users/reubenverdusco/Desktop/trello_clone/trello-clone/dist/index.html'
app.all("*", (req,res,next) => {res.sendFile(path.resolve("./dist/trello-clone/index.html"))});
app.listen(port, function() { console.log("listening on 8000") });
