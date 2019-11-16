const URL = 'http://localhost:3000'
let data = {
  steamid: ""
}

$('a[target=_blank]').on('click', function(){
  require('nw.gui').Shell.openExternal( this.href );
  return false;
});

$('.btn').click(() => {
  data.steamid = $('#username-input').val();

  $.post(URL, data, (response, status) => {
    console.log(`${response} and ${status}`)
    if (status == 'success') {

    }
    $("#content").text(response);
  })
})