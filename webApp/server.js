require('@google-cloud/debug-agent').start();

let currentHeartBeat = 0;
let heartBeats = [];
let max= 0;
let min= 0;
let mean;
let median;
let express = require('express')
let app = express()
let url = require('url')

app.set('view engine', 'ejs')
// respond when a GET request is made to the homepage
// use a response to send things back
// GET method route
app.get('/', (req, res) => {
    console.log(req.query)
    res.render('myview.ejs')
    //res.send('GET request to the homepage\n')
})
app.get('/appData', (req, res) => {
    console.log(req.query)
    currentHeartBeat = req.query.heartRate;
    heartBeats.push(currentHeartBeat);
    if(min == 0 || max == 0){
        min = currentHeartBeat;
        max = currentHeartBeat;
    }
    if(max < currentHeartBeat){
        max = currentHeartBeat;
    }
    if(min > currentHeartBeat){
        min = currentHeartBeat;
    }
    heartBeats = [...arr].sort((a, b) => a - b); //w3resource.com/javascript-exercises/fundamental/javascript-fundamental-exercise-88.php
    let mid = Math.floor(arr.length / 2);
    if(heartBeats.length % 2 !== 0){
        median = heartBeats[mid];
    }else{
        median = (heartBeats[mid-1] + heartBeats[mid])/2;
    }
    let total = 0;
    for(let i = 0; i < heartBeats.length; i ++){
        total += heartBeats[i];
    }
    mean = total/heartBeats.length;
})
app.get('/statistics', (req, res) => {
    console.log(req.query)

    res.render('statistics.ejs', {min:min, max:max, median:median, mean:mean})
    //res.send('GET request to the homepage\n')
})
// app.get('/timesHelloed', (req, res) => {
    //testing
//   console.log(req.query)
//   res.render('timesHelloed.ejs', {timesHelloed:timesHelloed})
//   //res.send('GET request to the homepage\n')
// })


// POST method route
app.post('/', (req, res) => {
    res.send('POST request to the homepage\n')
})

let port = process.env.PORT || 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
