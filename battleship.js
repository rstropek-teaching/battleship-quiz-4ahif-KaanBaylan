$(() => {
  // Select table containing the battleground
  const battleground = $('#battleground');

  // Build 10 x 10 grid for battleground
  for (let row = 0; row < 10; row++) {
    // Create table row
    const tr = $('<tr>');
    for (let column = 0; column < 10; column++) {
      // Create table cell with CSS class `water`. Note that we use
      // HTML data attributes  to store the coordinates of each cell
      // (see https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes). 
      // That makes it much easier to find cells based on coordinates later.
      $('<td>').addClass('water').attr('data-r', row).attr('data-c', column).appendTo(tr);
    }

    // Add table row to battleground table
    tr.appendTo(battleground);
  }

  const ships = [5, 4, 3, 3, 2];
  var check = [true, true, true, true, true];
  var shiplength;
  
  var index;
  var posR;
  var posC;
  var drct;

  var exit = true;
  $('#generate').click(() => {
    for(var i = 0; i < 10; i++){
      for(var j = 0; j < 10; j++){
        $('td[data-r="'+i+'"][data-c="'+j+'"]').removeClass('ship').addClass('water');
      }
    }

    exit = true;
    check = [true, true, true, true, true];
    while (exit) {
      posR = Math.floor(Math.random() * 10);
      posC = Math.floor(Math.random() * 10);

      drct = Math.floor(Math.random() * 2);

      index       = selectShip(check);
      shiplength  = ships[index];


      switch(drct){
        case 0:
          if(checkFitVertical(shiplength, posR, posC)){
            check[index] = false;
           
            for(var i = posR; i < (posR + shiplength); i++)
              $('td[data-r="'+i+'"][data-c="'+posC+'"]').removeClass('water').addClass('ship');

          }
          break;
        case 1:
          if(checkFitHorizontal(shiplength, posR, posC)){
            check[index] = false;
           
            for(var i = posC; i < (posC + shiplength); i++)
              $('td[data-r="'+posR+'"][data-c="'+i+'"]').removeClass('water').addClass('ship');

          }
          break;
      }
      

      exit = false;
      for (var i = 0; i < ships.length; i++) {
        if (check[i])
          exit = true;
      }

    }
  });
});


function selectShip(check) {
  var index = Math.floor(Math.random() * 5);
  
  while (!check[index]) {
    index = Math.floor(Math.random() * 5);
  }
  
  return index;
}

function checkFitVertical(shiplength, posR, posC) {
  if((posR + shiplength) < 9){
    for(var i = posR-1; i < (posR + shiplength) + 1; i++) {
      if($('td[data-r="'+ i +'"][data-c="' + posC + '"]').hasClass('ship'))
        return false;
      
      if($('td[data-r="' + i + '"][data-c="' + (posC-1) + '"]').hasClass('ship'))
        return false;
      
      if($('td[data-r="' + i + '"][data-c="' + (posC+1) + '"]').hasClass('ship'))
        return false;   
      
    }
    return true;
  }

  return false;
}

function checkFitHorizontal(shiplength, posR, posC) {
  if((posC + shiplength) < 9){
    for(var i = posC-1; i < (posC + shiplength + 1); i++) {
      if($('td[data-r="'+ posR +'"][data-c="' + i + '"]').hasClass('ship'))
        return false;
      
      if($('td[data-r="' + (posR-1) + '"][data-c="' + i + '"]').hasClass('ship'))
        return false;
    
      if($('td[data-r="' + (posR+1) + '"][data-c="' + i + '"]').hasClass('ship'))
        return false;

    }
    return true;
  }

  return false;
}
