const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const { response } = require("express");
const https = require("https");
const { doesNotThrow } = require("assert");


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
   res.sendFile(__dirname + "/signup.html"); 
})

// Api key
//  f337f56a6cf6d322e92c23a925decda8-us10

// Audience Id
// 6860262933

app.post("/", function(req, res){
    const firstname = req.body.Firstname
    const lastname = req.body.Lastname 
    const email = req.body.email  

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstname,
                    LNAME: lastname
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);  

    const url = "https://us10.api.mailchimp.com/3.0/lists/6860262933";

     var options = {
        method: "POST",
        auth: "deepak1:37f56a6cf6d322e92c23a925decda8-us10"
    }  

   const request =  https.request(url, options, function(data){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
          
        else{
            res.sendFile(__dirname + "/failure.html");
        }
          
        
         console.log(data);
         
         response.on("data", function(data){
         
          console.log(JSON.parse(data));
         
         })

    });

   request.write(jsonData);

    request.end();

   

  //  console.log(email);
  //  console.log(firstname);
  //  console.log(lastname);
});

app.post("/failure", function(req, res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("server is running on port 3000");
})