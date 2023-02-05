var myVersion = "0.40", myProductName = "testRssCloud", myPort = 0, myDomain = ""; 
const express = require('express');
const app = express();
const port = 443;
const bodyParser = require('body-parser'); // Middleware

const { Server } = require('ws');

var request = require ("request");
var pingrequest = require ("request");
var http = require ("http"); 
var path = require('path');
var ejs = require('ejs');

const fs = require ("fs");
const utils = require ("daveutils");
const reallysimple = require ("reallysimple");
const rss = require ("daverss");


var testText = "";
var xmltext = "";
var newItems = [];

var config = {
        host: "",
        subs: new Array (),
		baseURL: "",
		myDomain: "",
		myPort: 0
};

var urlRssCloudServer = "http://rpc.rsscloud.io:5337/pleaseNotify";
var whenLastPleaseNotify = new Date (0);

var headElements = { 
	"title": "Andy's linkblog feed",
	"link": "https://fedwiki.andysylvester.com:443/feed/rss.xml",
	"description": "Trying out the daverss package.",
	"language": "en-us",
	"generator": "My Status Tool",
	"docs": "http://cyber.law.harvard.edu/rss/rss.html",
	"twitterScreenName": "AndySylvester99",
	"facebookPageName": "",
	"maxFeedItems": 25,
	"flRssCloudEnabled": true,
	"rssCloudDomain": "rpc.rsscloud.io",
	"rssCloudPort": 5337,
	"rssCloudPath": "/pleaseNotify",
	"rssCloudRegisterProcedure": "",
	"rssCloudProtocol": "http-post"
	};

var titleTest = "Test title";

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
  readConfig();
  // getFeedContent();
  	everyMinute();
	setInterval(everyMinute, 60000); 
})

const sockserver = new Server({ port: 500 });

sockserver.on('connection', (ws) => {
   console.log('New client connected!'); 
   ws.on('close', () => console.log('Client has disconnected!'));
});
 
setInterval(() => {
   sockserver.clients.forEach((client) => {
       const data = JSON.stringify({'type': 'time', 'time': testText});
       client.send(data);
   });
}, 1000);

app.use(function(req,res,next){
    res.locals.userValue = null;
    next();
});

app.use(express.static('public'));

app.use(express.static('public/feed/'));

function feedUpdated (urlFeed) { //called when the feed updates
	console.log ("feedUpdated: url == " + urlFeed + ", now == " + new Date ().toLocaleString ());

	reallysimple.readFeed (urlFeed, function (err, theFeed) {
		if (err) {
			console.log (err.message);
			}
		else {
			var jsontext = utils.jsonStringify (theFeed.title) + "\n" + "<a href=" + utils.jsonStringify (theFeed.items[0].guid) + ">" + utils.jsonStringify (theFeed.items[0].title) + "</a><br>";
			if (utils.jsonStringify (theFeed.items[0].title) === undefined)
			{ 
				jsontext = utils.jsonStringify (theFeed.title) + "\n" + "<a href=" + utils.jsonStringify (theFeed.items[0].guid) + ">" + utils.jsonStringify (theFeed.items[0].description) + "</a><br>";
			}
			console.log ("theFeed == " + jsontext);
			testText = jsontext + "<br><br>" + testText;
			titleTest = titleTest + "\n\n" + jsontext + "\n\n";
			}
		});


	};
function pleaseNotify (urlServer, domain, port, path, urlFeed, callback) {
	var theRequest = {
		url: urlServer,
		headers: {Accept: "application/json"},
		method: "POST",
		form: {
			domain: domain,
			port: port,
			path: path,
			url1: urlFeed,
			protocol: "http-post"
			}
		};
    console.log(domain + "\n");
    console.log(port + "\n");
    console.log(path + "\n");
	
	request (theRequest, function (error, response, body) {
		if (!error && (response.statusCode == 200)) {
			// var serverResponse = JSON.parse (response.body);
			var serverResponse = response.body;
			console.log ("response:  == " + response.body + ".\n")
			if (callback) {
				callback (serverResponse) 
				}
			}
		else {
			console.log ("pleaseNotify: error, code == " + response.statusCode + ", " + response.body + ".\n");
			}
		});
	};
	
function pleaseNotifyTest (urlServer, domain, port, path, urlFeed, callback) {
	var theRequest = {
		url: urlServer,
		headers: {Accept: "application/json"},
		method: "POST",
		form: {
			domain: domain,
			port: port,
			path: path,
			url: urlFeed,
			protocol: "http-post"
			}
		};
    console.log(domain + "\n");
    console.log(port + "\n");
    console.log(path + "\n");
	
	request (theRequest, function (error, response, body) {
		if (!error && (response.statusCode == 200)) {
			// var serverResponse = JSON.parse (response.body);
			var serverResponse = response.body;
			console.log ("response:  == " + response.body + ".\n")
			if (callback) {
				callback (serverResponse) 
				}
			}
		else {
			console.log ("pleaseNotify: error, code == " + response.statusCode + ", " + response.body + ".\n");
			}
		});
	};

function secondsSince (when) { 
	var now = new Date ();
	when = new Date (when);
	return ((now - when) / 1000);
	};

function everyMinute () {
	if (secondsSince (whenLastPleaseNotify) > (24 * 60 * 60)) {
		for (let i = 0; i < config.subs.length; i++) {
			pleaseNotify (urlRssCloudServer, myDomain, myPort, "/feedupdated", config.subs[i], function (response) {
				console.log ("\npleaseNotify: success == " + response.success + ", msg == \"" + response.msg + "\"\n");
							});
		}
		whenLastPleaseNotify = new Date ();
	}
};

function render (postText, dirname) { 
    console.log ("Got to render function ");
    console.log ("postText = ", postText);
	var pageModel = {
	  content: ""
    };
	var html = "";
	var timeStringPath = "/public/";
	var dirPath = "";
	// var timestamp = Date.now();
	// var timestampSec = Math.floor(timestamp/1000);

	pageModel.content = postText;
	// Get current time as a string, add to path
	// timeString = timestampSec.toString();
	// timeStringPath = timeStringPath + timeString;
	timeStringPath = timeStringPath + dirname;

    var filePath = __dirname + timeStringPath + "/index.html";
	console.log("filePath = ", filePath);

    // Render post text using the EJS template file
	ejs.renderFile('post_template.ejs', { model: pageModel }, {}, function(err, str){
		console.log(str);
		html = str;
		// str => Rendered HTML string
	});

    // Create timestamp directory in public folder
	fs.mkdir(path.join(__dirname, timeStringPath),
	  { recursive: true }, (err) => {
		if (err) {
		  return console.error(err);
		} else {
			console.log('Directory created successfully!');
		// Write file to timestamp directory

			fs.writeFile(filePath, html, (err) => {
			  if (err)
				console.log(err);
			  else {
				console.log("File written successfully\n");
			  }
			});
		}
	  });
	  

	// return timestampSec;
	};

function getFeedContent () { 
		const urlFeedContent = "http://hn.geekity.com/newstories.xml";
		var jsontextContent = "";
		console.log("config.subs: ", config.subs);

		for (let i = 0; i < config.subs.length; i++) {
			reallysimple.readFeed (config.subs[i], function (err, theFeed) {
				if (err) {
					console.log (err.message);
					}
				else {
					console.log("The length of theFeed.items is", theFeed.items.length);
					console.log("Link of first item is: ", utils.jsonStringify (theFeed.items[0].guid));
					// console.log (JSON.stringify (theFeed, undefined, 4));
					jsontextContent = utils.jsonStringify (theFeed.title);
					testText = testText + jsontextContent + "<br>";
					for (let i = 0; i < theFeed.items.length; i++) {
						jsontextContent = utils.jsonStringify (theFeed.items[i].title);
						if (utils.jsonStringify (theFeed.items[i].title) === undefined)
						{ 
							jsontextContent = "<a href=" + utils.jsonStringify (theFeed.items[i].guid) + ">" + utils.jsonStringify (theFeed.items[i].description) + "</a><br>";
						}
						else
						{
							jsontextContent = "<a href=" + utils.jsonStringify (theFeed.items[i].guid) + ">" + utils.jsonStringify (theFeed.items[i].title) + "</a><br>";
						}
						testText = testText + jsontextContent + "<br>";
					  }
					 console.log ("Contents of the feed: \n" + testText);
					}
				});
		}
	};

function readConfig () {
        fs.readFile ("config.json", function (err, data) {
                var userConfig = new Object ();
                if (!err) {
                        try {
                                userConfig = JSON.parse (data.toString ());
								console.log("userConfig : ", userConfig);
								for (x in userConfig) {
                                   config [x] = userConfig [x];
                                  }
								console.log("config : ", config);
								console.log("config URL 2: ", config.subs[1]);
								console.log("Length of subs array: ", config.subs.length);
								myDomain = config.myDomain;
								myPort = config.myPort;
								headElements = config.headElements;
								for (let i = 0; i < config.subs.length; i++) {
									pleaseNotify (urlRssCloudServer, myDomain, myPort, "/feedupdated", config.subs[i], function (response) {
										console.log ("\npleaseNotify: success == " + response.success + ", msg == \"" + response.msg + "\"\n");
													});
								}
								getFeedContent();

                                }
                        catch (err) {
                                console.log ("readConfig: err == " + err.message);
                                }
                        }
                });
        };

const posts = [
    {title: 'Title 1', body: 'Body 1' },
    {title: 'Title 2', body: 'Body 2' },
    {title: 'Title 3', body: 'Body 3' },
    {title: 'Title 4', body: 'Body 4' },
];

const user = {
    firstName: 'Tim',
    lastName: 'Cook'
};

app.get('/', (req, res) => {
    console.log ("req.body (1): == " + req.body);
    res.render('pages/index', {
        user,
        title: "Home Page",
		testText
    })
});

app.get('/articles', (req, res) => {
    res.render('pages/articles', {
        articles: posts,
        title: "Articles"
    })
});


app.get('/about', (req, res) => {
    res.render('pages/about', {
        title: "About"
    })
});

app.get('/feedupdated', (req, res) => {
    console.log ("req.method: == " + req.method);
    console.log ("req.originalUrl: == " + req.originalUrl);
    console.log ("req.query.url: == " + req.query.url);
    console.log ("req.query.challenge: == " + req.query.challenge);
	var challenge = req.query.challenge;
	console.log ("/feedupdated: challenge == " + challenge);
	res.writeHead (200, {"Content-Type": "text/plain"});
	res.end (challenge);    
});


app.post('/', (req, res) => {
  // Insert Login Code Here
    console.log ("Got to POST branch");
    var newDate = new Date();
	var newDateString = newDate.toUTCString();
    var myText = {
        first : req.body.username
    }
	var newItem = {
		"text": req.body.username,
		"title": "",
		"link": "",
		"when": newDateString,
		"guid": {
			"flPermalink": true,
			"value": ""
			}
		};
	var feedPath = "/public/feed/rss.xml";

	var timestamp = Date.now();
	var timestampSec = Math.floor(timestamp/1000);
	var timeString = timestampSec.toString();
	var reversedArray = []

	newItem.link = config.baseURL + timeString;
	newItem.guid.value = config.baseURL + timeString;
	// newItem.link = "http://fedwiki.andysylvester.com:443/" + timeString;
	// newItem.guid.value = "http://fedwiki.andysylvester.com:443/" + timeString;
	console.log("newItem.link = ", newItem.link);
	console.log("newItem.guid = ", newItem.guid.value);
	
	newItems.push(newItem);
	console.log(newItem);
	console.log("Length of newItems = ", newItems.length);	
	console.log("newItems = ", newItems);
	// newReverse = newItems;
	// console.log("Length of newItems = ", newItems.length);	
	for (let i = newItems.length - 1; i >= 0; i--) {
       const valueAtIndex = newItems[i]
  
       reversedArray.push(valueAtIndex)
     };

    console.log("The reversed array is: ", reversedArray);

    // xmltext = rss.buildRssFeed (headElements, newReverse.reverse());
    xmltext = rss.buildRssFeed (headElements, reversedArray);
	// fs.writeFile ("/root/pubNub11/public/feed/rssandy.xml", xmltext, function (err) {
	fs.writeFile (path.join(__dirname, feedPath), xmltext, function (err) {

	if (err) {
		console.log (err.message);
		}
	else {
		console.log ("rss.xml successfully created.");
		render(req.body.username, timeString);
		setTimeout(function(){
			console.log('Third log message - after 1 second');
		}, 1000);

		pleaseNotifyTest ("http://rpc.rsscloud.io:5337/ping", myDomain, myPort, "", config.feedURL, function (response) {
			console.log ("\nping: success == " + response.success + ", msg == \"" + response.msg + "\"\n");
			// whenLastPleaseNotify = new Date ();
			});

		}
	});


    console.log(myText);
      res.render('pages/index', {
        user,
        title: "Home Page",
		userValue : myText
    })
});

app.post('/feedupdated', (req, res) => {
	// var body = "";
    console.log ("Got to feedupdated POST branch");
    // console.log ("req.method: == " + req.method);
    // console.log ("req.originalUrl: == " + req.originalUrl);
    // console.log ("req.params: == " + req.params);
    // console.log ("req.url: == " + req.url);
    console.log ("req.body.url: == " + req.body.url);
	feedUpdated (req.body.url);
	res.writeHead (200, {"Content-Type": "text/plain"});
	res.end ("Thanks for the update! :-)");  
});

