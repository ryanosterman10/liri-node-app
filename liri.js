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
		songInput();
		break;
	case "movie-this":
		movieInput();
		break;
	case "do-what-it-says":
		doItToIt();
		break;
}

// line variable for terminal divisions
var line = "********************************************************************";


// Twitter npm

function listTweets(){
	var params = {screen_name: 'ryan_osterman10'};
	client.get('statuses/user_timeline', params, function(error, tweets, response){
		if(!error){
			console.log(tweets);
		}
	});
}

//Spotify npm

function songInput(){
	var userInputSong = "the sign ace of base";
		if(process.argv.length > 3){
			userInputSong = process.argv[3];
		}
		songInfo(userInputSong);
}

function songInfo(trackName){
	spotify.search({ type: 'track', query: trackName }, function(err, data) {
		var artist = data.tracks.items[0].artists[0].name;
		var songName = data.tracks.items[0].name;
		var preview = data.tracks.items[0].preview_url;
		var album = data.tracks.items[0].album.name;
		var songResult = "Artist: " + artist + "\nSong: " + songName + "\nPreview: " + preview + "\nAlbum: " + album;
    	if (err) {
        	console.log('Error occurred: ' + err);
        	return;
    	}
    	else{
    		console.log(line);
    		console.log(songResult);
    		console.log(line);
    	}
	});
}

function movieInput(){
	var userInputMovie = "Mr Nobody";
	if(process.argv.length > 3){
		userInputMovie = process.argv[3]
	}
	movieInfo(userInputMovie);
}

function movieInfo(movieName){
	request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&r=json", function(error, response, body){
		if(!error && response.statusCode == 200){
			var result = JSON.parse(body);
			var movieResult = "Title: " + result.Title + "\nYear: " + result.Year + "\nIMBD Rating: " + result.imdbRating + "\nCountry: " + result.Country + "\nLanguage: " + result.Language + "\nPlot: " + result.Plot + "\nActors: " + result.Actors + "\nRotten Tomatoes Rating: " + result.tomatoRating + "\nRotten Tomatoes URL: " + result.tomatoURL;
			console.log(line);
			console.log(movieResult);
			console.log(line);
		}
	});
}


