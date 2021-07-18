const express =  require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(express.static("public"))
app.use(bodyParser.urlencoded({
  extended : true
}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function(req, res){
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.emailaddres;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME:firstname,
          LNAME:lastname,
        }

      }
    ]
  }
  const jasonData = JSON.stringify(data);
  const url ="https://us6.api.mailchimp.com/3.0/lists/cc7e36d05f";
  const options = {
    method : "POST",
    auth: "zain:7ee6d4e7496a991f66f61d285eebf4b9-us6"

  }
  const request = https.request(url, options, function(Response){
    if(Response.statusCode === 200){
      res.sendFile(__dirname + "/succsess.html");
    }
    else{
      res.sendFile(__dirname + "/failiaur.html");
    }
    Response.on("data", function(data){
      console.log(JSON.parse(data));
    });

  });
   request.write(jasonData);
  request.end();

});
app.post("/failiaur.html", function(req, res){
  res.redirect("/")
});


app.listen(process.env.PORT || 3000, function(){
  console.log("server is running on 3000 port");
})

//7ee6d4e7496a991f66f61d285eebf4b9-us6
//cc7e36d05f
