const data = require('./data')
const templates = require('./templates')

// Takes an html container as an arguement and inserts template literal versions
// of roommate data using the card() function
function showAll (container) {
  const cards = data.map((roommate, index) => templates.card(roommate, index)).join('')
  container.innerHTML = cards
}

// Takes an html container as an arguement and inserts the new roommate form into
// the innerHTML
function showNewForm (container) {
  container.innerHTML = templates.newRoommate()
}

function clearOldForm (container) {
  container.innerHTML = ''
}

function showUpdateForm (container, roommate) {
  container.innerHTML = templates.updateRoommate(roommate)
}

module.exports = {
  showAll, showNewForm, clearOldForm, showUpdateForm
}
