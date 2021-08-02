'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);
$('.btn-start').click(onStartGuessing);
$('.btn-yes').click({ ans: 'yes' }, onUserResponse);
$('.btn-no').click({ ans: 'no' }, onUserResponse);
$('.btn-add-guess').click(onAddGuess);

function init() {
  createQuestsTree();
}

function onStartGuessing() {
  //hide the game-start section
  $('.game-start').hide();
  $('.success').hide();
  //show the quest section
  renderQuest();
  $('.quest').show();
}

function renderQuest() {
  // select the <h2> inside quest and update
  // its text by the currQuest text
  $('.quest h2').text(getCurrQuest().txt);
}

function onUserResponse(ev) {
  var res = ev.data.ans;
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    $('.quest').hide();
    if (res === 'yes') {
      // alert('Yes, I knew it!');
      $('.success').show();
      onRestartGame();
      // TODO: improve UX
    } else {
      // alert('I dont know...teach me!');
      // hide and show new-quest section
      $('.new-quest').show();
    }
  } else {
    // update the lastRes global var
    gLastRes = res;
    moveToNextQuest(res);
    renderQuest();
  }
}

function onAddGuess(ev) {
  ev.preventDefault();
  var newGuess = $('#newGuess').val();
  var newQuest = $('#newQuest').val();
  if (!newGuess || !newQuest) return;
  if (newQuest.substr(-1) !== '?') {
    $('.question-mark').show();
    return;
  }
  // Get the inputs' values
  // Call the service addGuess
  addGuess(newQuest, newGuess, gLastRes);
  $('.question-mark').hide();
  $('.game-start').show();
  onRestartGame();
}

function onRestartGame() {
  $('.new-quest').hide();
  gLastRes = null;
  $('#newGuess').val('');
  $('#newQuest').val('');
  init();
}
