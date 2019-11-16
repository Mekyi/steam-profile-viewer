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
  data.steamid = $('#username-input').val();
  
  $.post(LOCAL_SERVER_URL + '/OwnedGames', data, (res, status) => {
    console.log(`${res} and ${status}`)
    if (status == 'success') {
      userGameList = JSON.parse(res);
      createGameTable(userGameList['response']['games']);
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
  $("#game-table").show();
}