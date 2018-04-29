var app=require("../index.js");
describe("home",function(){
it("The function should display homepage",function() {
var value=app.home();
});
});

describe("course_single",function(){
it("The function should display each course page",function() {
var value=app.course_single();
});
});

describe("payment_gateway",function(){
it("The function should display payment page",function() {
var value=app.payment_gateway();
});
});


describe("thankyou_gateway",function(){
it("The function should display thankyou page",function() {
var value=app.thankyou_gateway();
});
});


describe("notFound",function(){
it("The function should display error page",function() {
var value=app.notfound();
});
});
