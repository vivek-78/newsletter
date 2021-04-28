const express = require("express");
const http =  require("https");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static("public"));

app.get("/" , function(req , res){

    res.sendFile(__dirname + "/index.html");
})

app.post("/" , function( req , res){

    const fn = req.body.firstName;
    const ln = req.body.lastName;
    const email = req.body.email;

    console.log(fn , ln , email)

    const data = {
        members : [
            {
            email_address : email,
            status : "subscribed",
            merge_fields : {
            FNAME : fn,
            LNAME : ln,
            }
        }
        ]
    }
    const jsonData = JSON.stringify(data);
    
    const url = "https://us1.api.mailchimp.com/3.0/lists/c38e3021fe"

    const options = {

        method : "POST",
        auth : "vivek:4264e2bb22c5534b69b598a995fb5675-us1"
    }

    const request = http.request(url , options , function(response){
        response.on("data" , function(data){
            console.log(JSON.parse(data))
        })
    })

    request.write(jsonData)
    request.end();
})

app.listen(process.env.PORT || 8080 , function(){
    console.log("your server is running on port 8080");
})

// api key : 91e5716b0eb8088f7322a508fd6c8f84-us1
// list id : list id : c38e3021fe 
