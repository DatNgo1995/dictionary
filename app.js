var express = require("express");
var cors = require("cors");
var app = express();
var bodyParser = require("body-parser")
var skierTerms = [
    {
        term: "Tomorrow",
        defined: "The best time to do everything you had planned today."
    },
    {
        term: "Clapping",
        defined: "Repeatedly high-fiving yourself for someone else's accomplishments"
    },
    {
        term: "Vegetarian",
        defined: 'Latin phrase, original meaning: "really bad hunter" '
    }
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(function(req, res, next) {
    
    console.log(`${req.method} request for '${req.url}'-${JSON.stringify(req.body)}`);

	next();
});

app.use(express.static("./public"));

app.use(cors());

app.get("/dictionary-api", function(req, res) {
	res.json(skierTerms);
});

app.post("/dictionary-api", function(req, res) {
    skierTerms.push(req.body);
    res.json(skierTerms);
});
app.delete("/dictionary-api/:term", function(req, res) {
    skierTerms = skierTerms.filter(function(definition) {
        return definition.term.toLowerCase() !== req.params.term.toLowerCase();
    });
    console.log("deleted")
    res.json(skierTerms);
});
app.listen(3000);

console.log("Express app running on port 3000");

module.exports = app;