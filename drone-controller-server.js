const express = require("express");
const socket = require('socket.io');
const Twit = require('twit');
const config = require('./config');


let results = {
    land : 0,
    moveLeft : 0,
    flip : 0,
    moveForwards : 0,
    moveRight : 0,
    takeOff : 0,
    flip : 0,
    moveBackwards : 0
}

function ResetResults() {
    results = {
        land : 0,
        moveLeft : 0,
        flip : 0,
        moveForwards : 0,
        moveRight : 0,
        takeOff : 0,
        flip : 0,
        moveBackwards : 0
    }
}

const app = express();
const server = app.listen(3000);
app.use("/lib", express.static('./lib/'));
app.use(express.static("public"));

const io = socket(server);
let socketReference;

io.sockets.on('connection', (socket) => {
    socket.on('GetTweets', Load);
    socketReference = socket;
})


function Load(query){
    if(!query) return;
    let params = {
        q: query,
        count: 100,
        lang: 'en'
    };
    console.log('fetching tweets');
    
    //Get tweets, call GotData() When Done
    let T = new Twit(config);
    T.get('search/tweets', params, GotTweets);
}

function GotTweets(err, data, response){
    ResetResults();
    let tweets =  data ? data.statuses : [];
    if (tweets)
    console.log('tweets' + tweets.length);

    if (tweets){
        tweets.forEach(tweet => {
            ExtractCommands(tweet.text);
        });
    }

    socketReference.emit('dataReady', results);
}

function ExtractCommands(tweet){

    results.flip +=         CommandCount(tweet, 'flip');
    results.moveLeft +=     CommandCount(tweet, 'left');
    results.moveRight +=    CommandCount(tweet, 'right');
    results.moveForwards += CommandCount(tweet, 'forward');
    results.moveBackwards += CommandCount(tweet, 'backward');

}

function CommandCount(tweet, command){
    return (tweet.match(new RegExp(command, "g")) || []).length
}