
function pvpGame() {
    const pvpconnect4 = new PvPConnect4('#connect4')
  
    pvpconnect4.onPlayerMove = function() {
      $('#player').text(pvpconnect4.player);
    }
    
    $('#restart').click(function() {
      pvpconnect4.restart();
    })
  };
