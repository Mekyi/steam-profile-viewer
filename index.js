/**
 * @file index.js is the client logic file
 */

/**
 * Local server URL
 * @type {string}
 */
const LOCAL_SERVER_URL = 'http://localhost:3000';

/**
 * POST request body
 * @type {{steamid: string}}
 */
const data = {
  steamid: ''
};

/**
 * Contains list of Steam game ID and name
 * @type {Array<object>}
 */
let appNameList = [];

/**
 * Contains list of games owned by the user
 * @type {Array<object>}
 */
let userGameList = [];

/**
 * Execute when document is loaded
 */
$(document).ready(() => {
  getGameList();
  redirectLinks();
});

/**
 * Get list of all games and their IDs
 */
let getGameList = () => {
  $.get(LOCAL_SERVER_URL + '/AppList', (res, status) => {
    if (status == 'success') {
      appNameList = JSON.parse(res);
    }
  });
}

/**
 * Redirect blank targeted links to default browser instead of using app window
 */
let redirectLinks = () => {
  $('a[target=_blank]').on('click', function(){
    require('nw.gui').Shell.openExternal( this.href );
    return false;
  });
}

/**
 * Post search and handle the response
 */
$('#search').click(() => {
  clearSearch();
  
  data.steamid = $('#username-input').val();
  
  $.post(LOCAL_SERVER_URL + '/OwnedGames', data, (res, status) => {
    console.log(`${res} ${typeof(res)} and ${status}`)
    let response = tryParseJSON(res);
    console.log(response);
    if (status == 'success' && response) {
      userGameList = JSON.parse(res);
      if (userGameList['response']['games']) {
        createGameTable(userGameList['response']['games']);
      }
      else {
        spawnAlert("Profile is set to private!");
      }
    }
    else {
      spawnAlert("Profile not found!");
    }
  })
})

/**
 * Returns Steam app name for given id
 * @param {number} id - App id
 * @returns {string} - App name
 */
// Converts Steam app id to name
let idToName = (id) => {
  return appNameList['applist']['apps'].find(x => x.appid === id).name;
}

/**
 * Converts playtime from minutes to hours
 * @param {number} minutes - Minutes
 * @returns {number} - Hours
 */
let playTimeToHours = (minutes) => {
  return (minutes / 60).toFixed(1);
}

/**
 * Creates HTML table from user game list
 * @param {Array<object>} array - User game list
 */
let createGameTable = (array) => {
  array.forEach(element => {
    $('#game-table-body').append(
      `<tr>
        <td>${element['appid']}</td>
        <td>${idToName(element['appid'])}</td>
        <td>${playTimeToHours(element['playtime_forever'])} h</td>
        <td>
          <a class="btn btn-primary nav-link" 
            href="https://store.steampowered.com/app/${element['appid']}" 
            target="_blank">Store Page
          </a>
        </td>
      </tr>`
    );
  });
  $('#game-table').show();
}

/**
 * Tries to parse JSON and returns object or false depending on the outcome
 * @param {string} jsonString - JSON to parse
 * @returns {boolean | object} - Parse result 
 */
let tryParseJSON = (jsonString) => {
  try {
    let o = JSON.parse(jsonString);
    if (o && typeof o === "object") {
      return o;
    }
  }
  catch (e) { }

  return false;
}

/**
 * Spawn alert box with wanted message and bootstrap style
 * @param {string} alertText - Alert text
 * @param {string} alertType - Bootstrap alert type
 */
let spawnAlert = (alertText, alertType="danger") => {
  $('#alerts').append(
    `<div class="alert alert-${alertType} fade show" role="alert">
      ${alertText}
    </div>`
  )
}

/**
 * Clear existing search results
 */
let clearSearch = () => {
  $('#alerts div').alert('close');
  $('#game-table').hide();
  $('#game-table-body tr').remove();
}
