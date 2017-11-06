var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get('/', function(req, res){
  res.render("landing");
});

app.get("/campgrounds", function(req, res){
	var campgrounds = [
		{name: "Salmom Creek", url: "https://farm3.staticflickr.com/2311/2123340163_af7cba3be7.jpg"},
		{name: "Granite Hill", url: "https://farm9.staticflickr.com/8305/28863132143_b8358c027f.jpg"},
		{name: "Mountains Goat's rest", url: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"}
	]
	res.render("campgrounds", {campgrounds: campgrounds});
});

app.listen(3000, function(){
	console.log("The yelpCamp server has started");
});