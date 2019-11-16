const express = require('express')
const app = express()
const port = 3000
const request = require('request')
const API_KEY = 'PUT_YOUR_OWN_KEY_HERE' // PROBABLY A GOOD IDEA TO KEEP IT PRIVATE
const BASE_URL = 'https://api.steampowered.com'
app.use(express.json())
app.use(express.urlencoded({extended: true}))

let isNum = function(str) {
    return /^\d+$/.test(str);
}

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))
app.post('/', (req, res) => {
    if(!isNum(req.body.steamid)) {
        request(BASE_URL + '/ISteamUser/ResolveVanityURL/v1/?key=' + API_KEY + '&vanityurl=' + req.body.steamid, function(error, response, body) {
            let json = JSON.parse(body)
            let id = json['response']['steamid']
            request(BASE_URL + '/IPlayerService/GetOwnedGames/v0001/?key=' + API_KEY + '&steamid=' + id, function (error, response, body) {
                res.send(body)
            })
        })
    }
    else {
        request(BASE_URL + '/IPlayerService/GetOwnedGames/v0001/?key=' + API_KEY + '&steamid=' + req.body.steamid, function (error, response, body) {
            res.send(body)
        })
    }
    /*request(BASE_URL + '/ISteamUser/GetPlayerSummaries/v0002/?key=' + API_KEY + '&steamids=' + req.body.steamid, function (error, response, body) {
        res.send(body)
    })*/
    /*request(BASE_URL + '/IPlayerService/GetOwnedGames/v0001/?key=' + API_KEY + '&steamid=' + req.body.steamid, function (error, response, body) {
        res.send(body)
    })*/})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))