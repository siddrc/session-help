const express = require('express');
var logInRoutes = express.Router();
mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const SessionStore = require("../sessionstore/sessionstore")
const uuidv4 = require('uuid/v4');
// Defined login route
/*logInRoutes.route('/login').post(function (req, res) {

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
      var check_dbo = db.db('eclipsia');
      var given_email=req.body.email;
      var given_password=req.body.password;
      check_dbo.collection("company").findOne({company_email: given_email}, async function(err, result) {
          if(result){
               if(bcrypt.compareSync(given_password, result.password)) {
                    req.session.email= result.company_email;
                    req.session.company_id= result._id;
                    req.session.save();
                    if(req.session.email){
                        res.status(200).json({'return_data': '1' ,"uuid":userSessionId }); 
                    }else {
                        res.status(200).json({'return_data': '0'});
                    }
   
               }else { 
                res.status(200).json({'return_data': '2'});
               }
          }else{ 
                res.status(200).json({'return_data': '3'});
          }
      });
    });
});*/


logInRoutes.route('/login').post(async (req, res)=>{
  try{
    const connection = await MongoClient.connect(url)
    const check_dbo = connection.db('eclipsia');
    const given_email = req.body.email;
    const given_password=req.body.password;
    const userRecord = await  check_dbo.collection("company").findOne({company_email: given_email})
    if(bcrypt.compareSync(given_password, userRecord.password)){
          const userSessionId = uuidv4()
          SessionStore.persist(`userSessionIdAsKey-${userSessionId}-email`,result.company_email)
          SessionStore.persist(`userSessionIdAsKey-${userSessionId}-company_id`,result._id)
          const email = await SessionStore.fetch(`userSessionIdAsKey-${userSessionId}-email`)
          if(email){
              res.status(200).json({'return_data': '1' ,"uuid":userSessionId }); 
          }else {
              res.status(200).json({'return_data': '0',"uuid":null});
          }
    }else{
      res.status(200).json({'return_data': '2',"uuid":null});
    }
  }catch(e){
      res.status(200).json({'return_data': '3',"uuid":null});
  }
})
/*
1. I am assuming you have installed Redis in your system, and it should be running as a service at the default port.
2. I have created SessionStore class, which basically talks to Redis
3. If you see above I am using userSessionId to identify each client, see the thing is we have one server but many clients, how do we store all clients data with same key, without over-ridding someone elses session data.
Answer: We identify each user at successfull login -`userSessionId` and send userSessionId back in response.

4.The client must store this userSessionId in localStorage (readily available browser object-Google it).
And after login in each request, the client must provide userSessionId so that we can use it to fetch the correct data from Redis.

5. Imagine a bank cashier, and you with a token, how does the cashier know against what check and what amount did you get your token on.Obviously there must have been some internal checks done and notifications done when you submitted the check. This is somewhat similar.


Please note:
1. You need to read Clean Code by Robert C.Martin, Head First Design Patterns, Effective Java by Joshua Blosch, Data Structures and Algorithms by Robert Lafore

FUNCTIONS MUST ALWAYS BE SMALL, OR ELSE YOU CANNOT RE-USE THEM.

2. You need to start thinking about reusability of code.
3. You need to learn the use of async and await 
4. If you don't do the above three, you cannot become a NINJA ;)
5. Take a ES6 course by Wes Boss, trust me no one uses var now, it is outdated.
   I have videos of Wes Boss send me your email id and I can share the vidoes with you.
   
   Please read on Redis.
   Also, please note Redis has a limited memory, read on it.You cannot just keep dumping to redis, because Redis stores in RAM and not to Hard-disk. Clear redis once the user logs out, or you can set keys in Redis that expire on its own, ofcourse you need to mention some time period like a 3 hours or 1 day etc.

   And please learn to commit man, always commit package.json and package-lock.json
   NEVER EVER COMMIT node_modules.

*/


logInRoutes.route('/login_check').get(function (req, res) {

        if(req.session.email){
            res.status(200).json({'return_data': '1'}); 
        } else {
            res.status(200).json({'return_data': '0'});
        }

 });

module.exports = logInRoutes;
