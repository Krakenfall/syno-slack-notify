var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

// Constants
const app = express();
app.use(bodyParser.json());
const logFile = "server.log";
const port = process.env.RELAY_PORT ? process.env.RELAY_PORT : 9080;
const webhook = process.env.WEBHOOK_URI ? process.env.WEBHOOK_URI : "WEBHOOK_URI undefined";

const log = function(data, logInConsole) {
	try {
		fs.appendFileSync(logFile, `${new Date()}\r\n`);
		if (logInConsole) { console.log(data); }
		fs.appendFileSync(logFile, `${data}\r\n\r\n`);
	} catch (error) {
		console.log(`Error logging data in ${logFile}:\r\n${data}`);
	}
};

const postslack = function(comment, callback){
	request.post(webhook, {
		json: {"text": comment}},
		(error, response, body) => {
			if (!error && response && response.statusCode >= 200 && response.statusCode < 300) {
				message = `"${comment}" (${body})`;
				callback(null, message);
			}
			else {
				message = `Failed to post message to Slack:\r\n${error}\r\nMessage: ${comment}`;
				callback(message, null);
			}
		}
	);
}

// Handle root
app.get('/', function(req, res) {
    res.send("invalid request");
});

// Return api status
app.get('/status', function(req, res) {
	res.send('UP');
});

app.get("/receive", function(req, res) {
	res.writeHead(200);
	postslack(req.query.message, function(err){
		if (err) {
			log(err, true);
		} else {
			log(`Sent message: ${message}`, true)
		}
		res.end();
	});
});

app.listen(port, function () {
    log(`Server listening on port ${port}`, true);
});