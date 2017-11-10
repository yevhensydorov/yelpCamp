var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
	{name: "Salmom Creek", image: "https://farm3.staticflickr.com/2311/2123340163_af7cba3be7.jpg"},
	{name: "Granite Hill", image: "https://farm9.staticflickr.com/8305/28863132143_b8358c027f.jpg"},
	{name: "Mountains Goat's rest", image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"}
];

app.get('/', function(req, res){
  res.render("landing");
});

app.get("/campgrounds", function(req, res){
	res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
	//get data from form and add to campgrouds array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image}
	campgrounds.push(newCampground);
	//redirect back to campgrounds page
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
});



app.listen(3000, function(){
	console.log("The yelpCamp server has started");
});