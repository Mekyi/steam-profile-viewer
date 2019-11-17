const LOCAL_SERVER_URL = 'http://localhost:3000';
let data = {
  steamid: ""
}
let appNameList = [];
let userGameList = [];

$(document).ready(() => {
  // Get list of all games and their IDs
  $.get(LOCAL_SERVER_URL + '/AppList', (res, status) => {
    if (status == 'success') {
      appNameList = JSON.parse(res);
    }
  });
});

// Open blank targeted links in default browser
$('a[target=_blank]').on('click', function(){
  require('nw.gui').Shell.openExternal( this.href );
  return false;
});

$('#search').click(() => {
  // Clear existing search results
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

// Converts Steam app id to name
let idToName = (id) => {
  return appNameList['applist']['apps'].find(x => x.appid === id).name;
}

// Converts playtime from minutes to hours
let playTimeToHours = (minutes) => {
  return (minutes / 60).toFixed(1);
}

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

let spawnAlert = (alertText, alertType="danger") => {
  $('#alerts').append(
    `<div class="alert alert-${alertType} fade show" role="alert">
      ${alertText}
    </div>`
  )
}

let clearSearch = () => {
  $('#alerts div').alert('close');
  $('#game-table').hide();
  $('#game-table-body tr').remove();
}