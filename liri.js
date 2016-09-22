var keys = require('./keys.js');
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');
var nodeArg = process.argv[2];

var client = new Twitter({
	consumer_key: keys.twitterKeys.consumer_key,
	consumer_secret: keys.twitterKeys.consumer_secret,
	access_token_key: keys.twitterKeys.access_token_key,
	access_token_secret: keys.twitterKeys.access_token_secret
});

switch(nodeArg){

	case "my-tweets":
		listTweets();
		break;
	case "spotify-this-song":
		songInfo();
		break;
	case "movie-this":
		movieInfo();
		break;
	case "do-what-it-says":
		doItToIt();
		break;
}

// Twitter npm

function listTweets(){
	var params = {screen_name: 'ryan_osterman10'};
	client.get('statuses/user_timeline', params, function(error, tweets, response){
		if(!error){
			console.log(tweets);
		}
	});
}