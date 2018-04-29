let nodemailer = require('nodemailer');
let payumoney = require('payumoney-node');
// let mongodbConnect = require('../public/javascripts/mongodbConnect');
let MongoClient = require('mongodb').MongoClient;
var courses;

MongoClient.connect('mongodb://eckotrial1:eckotrial1123@ds261479.mlab.com:61479/eckovationtrial',function(err,database){

  if(err){
    console.log(err);
    process.exit(1);
  }

  database.collection("eckovation-courses").find({}).toArray(function(err,docs){
    if(err){
      console.log("Error at reading docs");
    }
    else{
      courses = docs[0].courses;
    }
  })
  console.log('DB Connection established');
});





//home
exports.home=function(req,res){
  res.render('home',{
    title:'PROFESSIONAL COURSE PORTAL',
    courses: courses,
  });
};



exports.course_single=function(req,res){
  var course_number = req.params.course_no;

  if(course_number >=1 && course_number <=6)
  {
  var course = courses[course_number - 1];
  var     title = course.title;
  var instructors = course.instructors;
  res.render('course_singles',{
    courses:courses,
    title : title,
    course:course,
    instructors : instructors
  });
}
else {
  res.render('notFound',{
    courses:courses,
    title:'ERROR:404 No such episode exists'
  });
}
};

let chosenCourse;
let redirect_url;


exports.payment_gateway = function (req,res) {
  var course_number = req.params.course_no;

  if(course_number >=1 && course_number <=6)
  {
    var course = courses[course_number-1];
    var title = course.title;
    chosenCourse = course.title;
    var teachers = course.instructors;

    res.header('Cache-Control', 'no-cache');
    res.render('payment',{
      title:'PAYMENT GATEWAY',
      courses:courses
    });
  }
  else{
    res.render('notFound',{
      courses:courses,
      title:'ERROR:404 No such episode exists'
    });
  }

}


exports.thankyou_gateway = function(req,res){

  //PAYMENT-INTEGRATION WITH payumoney
  payumoney.setKeys(process.env.merchent_id,process.env.merchent_key,process.env.merchent_random);

  payumoney.isProdMode(true);

  var paymentData = {
    productinfo: "Eckovation-Course",
    txnid: "someId",
    amount: "1.00",
    email: req.body.email,
    phone: "8800686166",
    lastname: "man",
    firstname: "nam",
    surl: "http://localhost:3000/payment", //"http://localhost:3000/payu/success"
    furl: "http://localhost:3000/" //"http://localhost:3000/payu/fail"
};

payumoney.makePayment(paymentData, function(error, response) {
  if (error) {
    // Some error
  } else {
    // Payment redirection link
    console.log('make Payment called');
    // res.status(301).redirect(response);
    redirect_url = response;
    res.redirect(redirect_url);
    console.log(response);
  }
});

// payumoney.paymentResponse("txnid", function(error, response) {
//   if (error) {
//     // Some error
//   } else {
//     console.log('payment Response');
//     console.log(response);
//   }
// });



  //Payment logic
  var max = 99999;var min=10000;
  var invoice = Math.floor(Math.random()*(max-min+1))+min;
  var msg = "Hello User,\nThankyou for booking our course"+
  chosenCourse+"\nWe hope you learn,enjoy and earn great success in life.\n"+
  "Invoice:"+invoice;


  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
          port: 465,
          secure: true, // true for 465, false for other ports
        auth: {
            user: 'eckovationsrirang@gmail.com', // generated ethereal user
            pass: process.env.auth_pass // generated ethereal password
        }
});

var mailOptions = {
  from: 'eckovationsrirang@gmail.com',
  to: req.body.email,
  subject: 'Eckovation Course Payment Confirmation',
  text: msg
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

//  res.redirect(redirect_url);


  // res.render('paymentSuccess',{
  //   title:'PAYMENT SUCCESS',
  //   courses:courses,
  //   msg:'An Email with invoice has been sent to the email specified.Feel free to browse for more'
  //
  // });

};



exports.notfound = function(req,res){
  res.render('notFound',{
    courses:courses,
    title:'ERROR:404 This page does not exist'
  });
};
