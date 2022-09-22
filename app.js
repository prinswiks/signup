const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html")
});

app.post("/", function(req, res) {
  var firstName = req.body.fname;
  var lastName = req.body.lname;
  var email = req.body.email;
  console.log(firstName, lastName, email);

  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }

    }]
  };
  const url="https://us8.api.mailchimp.com/3.0/lists/09fc81f400"
  const options = {
    method:"POST",
    auth: "shivam:81a8d47b84faf9685de03ddfd70ebfcc-us8"
  }
  var jsonData=JSON.stringify(data);
  const request = https.request(url,options,function(response){

    if (response.statusCode === 200)
    {
      res.send("SUCCESS");
    }
    else{
      res.send("fail");
    }
  response.on("data",function(data){
    console.log(JSON.parse(data));
  })
  });
  request.write(jsonData);
  request.end();


});

app.listen(process.env.PORT || 3000, function() {
  console.log("server working at 3000");
});


// API KEY
// 81a8d47b84faf9685de03ddfd70ebfcc-us8

// LIST ID
// 09fc81f400
