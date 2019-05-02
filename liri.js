//Var for required apps
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require('moment');
var fs = require('fs');

//takes in command line arguement
var userSelect = process.argv[2];
var userSearch = process.argv[3];

//run axios
var axios = require('axios');

//Run a request with axios to the OMDB API with the movie specified
function movieInfo(userSearch) {
    //If user does not enter any info
    if (userSearch === undefined) {
        userSearch = "Mr. Nobody"
        console.log('--------------------')
        console.log('')
        console.log(`If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/. It's on Netflix`)
    } {
        //Call API once user enter search
        axios.get(`http://www.omdbapi.com/?t=${userSearch}&y=&plot=short&apikey=trilogy`)
            .then(function (response) {
                console.log(`Title: ${response.data.Title}`)
                console.log(`Released: ${response.data.Year}`)
                console.log(`The IMDB rating is: ${response.data.imdbRating}`)
                console.log(`The Rotten Tomotoes score is: ${response.data.Ratings[1].Value}`)
                console.log(`Country: ${response.data.Country}`)
                console.log(`Language: ${response.data.Language}`)
                console.log(`Plot: ${response.data.Plot}`)
                console.log(`Actors: ${response.data.Actors}`)
            })
    }
}
//Function for BandinTown
function concertInfo(userSearch) {
    axios.get(`https://rest.bandsintown.com/artists/${userSearch}/events?app_id=codingbootcamp`)
        .then(function (response) {
            //Loop to display all search results
            for (let i = 0; i < response.data.length; i++) {
                console.log('--------------------')
                console.log('')
                console.log(`Name of Venue: ${response.data[i].venue.name}`)
                console.log(`Venue Location: ${response.data[i].venue.city}, ${response.data[i].venue.country}`)
                console.log(`Date of the Event: ${moment(response.data[i].datetime).format("L")}`)
            }
        })
}

//Function for Spotify
function songInfo() {
    spotify.search({ type: 'track', query: userSearch }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        // Do something with 'data'
        var songs = data.tracks.items;
        for (var i = 0; i < songs.length; i++) {
            console.log('--------------------')
            console.log('')
            console.log(`Artist(s): ${songs[i].artists[0].name}`)
            console.log(`Name: ${songs[i].name}`)
            console.log(`Preview song: ${songs[i].preview_url}`)
            console.log(`Album: ${songs[i].album.name}`)
            console.log('')
        }
    });
}

//Function for do what it says
function doWhatitSays(){
    fs.readFile('random.txt', 'utf8', function (err, data){
        if(err){
            return console.log(err)
        } console.log(data)
    })
}

//Function to run userInput when enter specific userSelect
function userInput(userSelect, userSearch) {
    if (userSelect === "movie-this") {
        movieInfo(userSearch);
    } if (userSelect === "concert-this") {
        concertInfo(userSearch);
    } if (userSelect === "spotify-this-song") {
        songInfo(userSearch);
    } if (userSelect === "do-what-it-says"){
        doWhatitSays(userSearch);
    } 
};
//Call userInput 
userInput(userSelect, userSearch)



