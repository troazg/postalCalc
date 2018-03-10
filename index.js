const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const url = require('url');
const bodyParser = require('body-parser');
const calculateRate = require('./rates');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/getRate', (req, res) => {

	let requestURL = url.parse(req.url, true);
	console.log("Query Parameters: " + JSON.stringify(requestURL.query));

	let cost = calculateRate(requestURL.query.weight, requestURL.query.type);

	res.render('pages/result', { 
		weight: req.body.weight,
		type: req.body.type,
		cost: cost 
	});
})

app.post('/getRate', (req, res) => {
	let cost = calculateRate(req.body.weight, req.body.type);

	res.render('pages/result', { 
		weight: req.body.weight,
		type: req.body.type,
		cost: cost 
	});
})


