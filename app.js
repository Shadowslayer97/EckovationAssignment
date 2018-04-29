let express = require('express');
let bodyParser = require('body-parser');


var app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}));

app.set('view engine','ejs');

var routes = require('./routes');

var path = require('path');
app.use(express.static(path.join(__dirname,'public')));
//Routes in routes/index.js
//home
app.get('/', routes.home);

app.post('/',routes.home);

//single anime
app.get('/Eckovation/:course_no?',routes.course_single);

//payment gatway
app.get('/courses/:course_no?',routes.payment_gateway);

app.post('/payment',routes.thankyou_gateway);

//error 404
app.get('*',routes.notfound);


app.listen(3000,() => {
  console.log('Server listening to port 3000');
});
