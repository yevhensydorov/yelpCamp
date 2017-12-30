var express = require("express"),
		app = express(),
		bodyParser = require("body-parser"),
		mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// 	{
// 		name: "Granite Hill",
// 		image: "https://farm9.staticflickr.com/8305/28863132143_b8358c027f.jpg",
// 		description: "This is a huge granite hill, ho bathrooms. No water. Beautiful granite!"
// 	}, function(err, campground){
// 		if(err){
// 			console.log(err);
// 		} else {
// 			console.log("Newly Created Campground: ");
// 			console.log(campground);
// 		}
// 	});

// var campgrounds = [
// 	{name: "Salmom Creek", image: "https://farm3.staticflickr.com/2311/2123340163_af7cba3be7.jpg"},
// 	{name: "Granite Hill", image: "https://farm9.staticflickr.com/8305/28863132143_b8358c027f.jpg"},
// 	{name: "Mountains Goat's rest", image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"}
// ];

app.get('/', function(req, res){
  res.render("landing");
});

app.get("/campgrounds", function(req, res){
	// get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){console.log(err)}
			else{res.render("index", {campgrounds: allCampgrounds})}
	});
});

app.post("/campgrounds", function(req, res){
	//get data from form and add to campgrouds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image: image, description: desc}
	//Create a new Campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){console.log(err)}
			else{res.redirect("/campgrounds")}
	});
	// campgrounds.push(newCampground);

});

app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
});

app.get("/campgrounds/:id", function(req, res){
	//find the campground with provided id
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
		//render show template with that campground
			res.render("show", {campground: foundCampground});
		}
	});
});

app.listen(3000, function(){
	console.log("The yelpCamp server has started");
});

