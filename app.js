require('dotenv').config()

const express = require('express')
const app = express()
const port = 3000
const request = require('request')
const API_KEY = "59C8C53A6FA37277F93D40CB1C9051AA" // PROBABLY A GOOD IDEA TO KEEP IT PRIVATE
const BASE_URL = 'https://api.steampowered.com'
app.use(express.json())
app.use(express.urlencoded({extended: true}))

/**
 * Function to check if a variable is a number
 * @param {string} str - String to check if it is a number or not
 * @param {boolean} - True or false
 */
let isNum = function(str) {
    return /^\d+$/.test(str);
}

/**
 * Get's index.html
 */
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))


/**
 * Get's list of apps
 */
app.get('/AppList', (req, res) => {
    request(BASE_URL + '/ISteamApps/GetAppList/v0002/?key=' + API_KEY, (error, response, body) => {
        res.send(body);
    })
});

/**
 * Test route for test function used to test if server works
 */
app.get('/test', (req, res) => {
    res.send('Success');
});

/**
 * Trasforms custom steam profile url to steam ID
 */
app.post('/OwnedGames', (req, res) => {
    if(!isNum(req.body.steamid)) {
        request(BASE_URL + '/ISteamUser/ResolveVanityURL/v1/?key=' + API_KEY + '&vanityurl=' + req.body.steamid, (error, response, body) => {
            let json = JSON.parse(body)
            let id = json['response']['steamid']
            request(BASE_URL + '/IPlayerService/GetOwnedGames/v0001/?key=' + API_KEY + '&steamid=' + id, (error, response, body) => {
                res.send(body)
            })
        })
    }
    else {
        request(BASE_URL + '/IPlayerService/GetOwnedGames/v0001/?key=' + API_KEY + '&steamid=' + req.body.steamid, (error, response, body) => {
            res.send(body)
        })
    }
})

module.exports.App = app;
module.exports.Key = API_KEY;
module.exports.Num = isNum;


