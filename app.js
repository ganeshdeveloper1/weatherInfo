const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();


app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});



app.post("/", function(req, res) {
    const query = req.body.cityName;
    const key = "ae4136eb73d2c443c70433807519bca2";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + key + "&units=" + unit;

    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on("data", function(data) {
            const weatherdata = JSON.parse(data);
            const temp = weatherdata.main.temp;
            const weatherdescription = weatherdata.weather[0].description;
            const icon = weatherdata.weather[0].icon;
            const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p> The Weather is " + weatherdescription + "</p>");
            res.write("<img src=" + imageurl + ">");
            res.write("<h1> The Temperature in " + query + " is " + temp + " degree Celsius. </h1>");
            res.send();
        });
    });
})



app.listen(3000, function() {
    console.log("server is running on port 3000");
});