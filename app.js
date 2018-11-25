
var express = require('express');
var url = require("url");

var websocket = require("ws");
var http = require("http")

var app = express();


/*
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

*/

var  port = process.argv[2];

/*

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

*/
/*
app.use("/", function(req, res){
  res.sendfile("client/index.html", {root : "./"});
});
*/
var server = http.createServer(app).listen(port);

var  httpPrefix = "<!doctype html><html><head><meta charset=\"UTF-8\"><title>CSE1500_Mastermind</title></head><body><h1>";
var httpSuffix = "</h1></body></html>";

app.get("/greetme", function (req, res) {
  var query = url.parse(req.url, true).query;
  var name = (query["name"] != undefined ) ? query.name : "Anonymous";
  res.send(httpPrefix + "Greetings, " + name + httpSuffix);
})

/*
const wss = new websocket.Server({ server });

wss.on("connection", function (ws) {
   setTimeout(() => {
    console.log("Connection State: " + ws.readyState);
    ws.send("Thanks for the message: -- The Server :) ");
    ws.close();
    console.log("Connection state:  " + ws.readyState); 
   }, 2000);
});

server.listen(port);
*/
//module.exports = app;
