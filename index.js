const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const url = require('url');
const bodyParser = require('body-parser');

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

//app.get('/getRate', (req, res) => calculateRate(req, res));


function calculateRate(weight, type) {

	switch(type) {
		case 'Letters (Stamped)':
			return calculateLS(weight);
			break;
		case 'Letters (Metered)':
			return calculateLM(weight);
			break;
		case 'Large Envelopes (Flats)':
			return calculateLE(weight);
			break;
		case 'First-Class Package Service - Retail':
			return calculatePS(weight);
			break;
		default: 
			console.log('WTF');
	}
}

function calculateLS(weight) {
	if (weight <= 1)
		return 0.50;
	else if (weight <= 2)
		return 0.71;
	else if (weight <= 3)
		return 0.92;
	else if (weight <= 3.5)
		return 1.13;
	else
		return calculateLE(weight);
}

function calculateLM(weight) {
	if (weight <= 1)
		return 0.47;
	else if (weight <= 2)
		return 0.68;
	else if (weight <= 3)
		return 0.89;
	else if (weight <= 3.5)
		return 1.10;
	else
		return calculateLE(weight);
}

function calculateLE(weight) {
	if (weight <= 1)
		return 1.00;
	else if (weight <= 2)
		return 1.21;
	else if (weight <= 3)
		return 1.42;
	else if (weight <= 4)
		return 1.63;
	else if (weight <= 5)
		return 1.84;
	else if (weight <= 6)
		return 2.05;
	else if (weight <= 7)
		return 2.26;
	else if (weight <= 8)
		return 2.47;
	else if (weight <= 9)
		return 2.68;
	else if (weight <= 10)
		return 2.89;
	else if (weight <= 11)
		return 3.10;
	else if (weight <= 12)
		return 3.31;
	else
		return 3.52;
}

function calculatePS(weight) {
	if (weight <= 4)
		return 3.50;
	else if (weight <= 8)
		return 3.75;
	else if (weight <= 9)
		return 4.10;
	else if (weight <= 10)
		return 4.45;
	else if (weight <= 11)
		return 4.80;
	else if (weight <= 12)
		return 5.15;
	else
		return 5.50;
}