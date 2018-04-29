// let MongoClient = require('mongodb').MongoClient;
//
// module.exports = {
//   connectMongodb : function(){
//     var courses;
//     MongoClient.connect(process.env.mongo_uri,function(err,database){
//       if(err){
//         console.log(err);
//         process.exit(1);
//       }
//
//       database.collection("eckovation-courses").find({}).toArray(function(err,docs){
//         if(err){
//           console.log("Error at reading docs");
//         }
//         else{
//           courses = docs[0].courses;
//         }
//       })
//       console.log('DB Connection established');
//     })
//     return courses;
//
//   }
// }
