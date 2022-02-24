
function pvpGame() {
    const pvpconnect4 = new PvPConnect4('#connect4')
  
    pvpconnect4.onPlayerMove = function() {
      $('#player').text(pvpconnect4.player);
    }
    
    $('#restart').click(function() {
      pvpconnect4.restart();
    })
  };

function pvaiGame() {
  const pvaiconnect4 = new PvAIConnect4('#connect4')

  pvaiconnect4.onPlayerMove = function() {
    $('#player').text(pvaiconnect4.player);
  }
  
  $('#restart').click(function() {
    pvaiconnect4.restart();
  })
};
