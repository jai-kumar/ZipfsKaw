const express = require('express');
const bodyParser = require('body-parser');
var request = require("request");

const app = express();
const port = process.env.PORT || 9000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/initialtest', (req, res) => {
	res.send({ express: 'Server up & running, CHEERS!' });
});

app.post('/api/searchword', (req, res) => {
  	var searchResults = [];
  	console.log(req.body);
	
	var query = req.body.post;
	var url = `https://en.wikipedia.org/w/api.php?action=opensearch&search="+ ${query} +"&format=json`;

	request(url, function (err, response, body) {
		if(err) {
	 		var error = "cannot connect to the server";
	 		console.log(error);
		} else {
			var FrequencyArray = [];
			
			var stringifiedData = JSON.stringify(body);

			var arrayWithoutSpecialChars = stringifiedData.replace(/[^\w\s+]/gi, ' ').toLocaleLowerCase().trim().split(" ");
			arrayWithoutSpecialChars = arrayWithoutSpecialChars.filter(function(str) {
    			return /\S/.test(str);
			});

			function frequencies(a){
			    return new Map([...new Set(a)].map(
			        x => [x, a.filter(y => y === x).length]
			    ));
			}

			function getFrequencyObject(array) {
			  frequencies(array).forEach((val, key) => {
			    let frequencyObj = {
			    	"word" : key,
			    	"frequency" : val
				}
			    FrequencyArray.push(frequencyObj);
			  });
			  return FrequencyArray;
			}

			finalData = getFrequencyObject(arrayWithoutSpecialChars);

			res.send(finalData);
	 	}
	});

	//res.send(req.body.post);
});

app.listen(port, () => console.log(`Listening on port ${port}`));