const express    = require("express");
const bodyParser = require("body-parser");
const request    = require("request");


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/" , function(req , res)
{
    res.sendFile(__dirname + "/index.html");
});

app.post("/" , function(req , res){
    var firstname = req.body.firstName;
    var lastname = req.body.lastName;
    var email = req.body.email;
    console.log(firstname , lastname , email);

    const url = "https://us1.api.mailchimp.com/export/1.0."

    const data = {
        members : [{


        FNAME : firstname
        LNAME : lastname
        EMAIL : email

        }]
    }

    const jsonData = JSON.stringify(data);



});

app.listen(1000 , function(){
 console.log("your server is running on port 1000");
});

// api key : 91e5716b0eb8088f7322a508fd6c8f84-us1
// audience key : c38e3021fe