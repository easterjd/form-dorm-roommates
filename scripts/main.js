const roommates = require('./roommates/render')
const data = require('./roommates/data')

// Set the section id where the roommates informtion will be displayed on the page
const roommatesContainer = document.querySelector('#roommates')
// Inserts roommate template literals into the section of the page
roommates.showAll(roommatesContainer)

//a function that executes the deletion of a card by locating it in the original array by
// index number
const deleteRoomate = (event) => {
  const index = event.target.getAttribute('data-id')
  data.splice(index, 1)
  // Re-renders information
  roommates.showAll(roommatesContainer)
  // Re-allocates the event listeners on the new page
  const deleteButtons = Array.from(document.querySelectorAll('.roommate-delete-button'))
  deleteButtons.forEach(button => {
    button.addEventListener('click', deleteRoomate)
  })
}
// Initially assigning event listeners to the delete button. To be appended in the above function
const deleteButtons = Array.from(document.querySelectorAll('.roommate-delete-button'))
deleteButtons.forEach(button => {
  button.addEventListener('click', deleteRoomate)
})

const updateButtons = Array.from(document.querySelectorAll('.roommate-update'))
updateButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    event.preventDefault()
    const index = event.target.getAttribute('data-id')
    const sidebar = document.querySelector('#sidebar')
    roommates.showUpdateForm(sidebar, data[index])

      const updateForm = document.querySelector('#update-roommate-form')
      updateForm.addEventListener('submit', (event) => {
        event.preventDefault()
        const {
          username, avatar, faction, street, suite, city, inputZip
        } = event.target
        data.splice(index, 1, {
            username: username.value,
            avatar: avatar.value,
            faction: faction.value,
            address: {
                street: street.value,
                suite: suite.value,
                city: city.value,
                zipcode: inputZip.value
            }
          })
          roommates.showAll(roommatesContainer)
      })
  })
})

// Targets the link at the top of the page to summon the new roommmate form
const newRoommateButton = document.querySelector('#new-roommate-button')
// Adds a click event listener to the above button that:
// -prevents default behavior
// -grabs the empty section with the id 'sidebar'
// -inserts the new form html into the section with showNewForm()
// Then adds another event listener on the form's submit button to prevent default behavior
newRoommateButton.addEventListener('click', (event) => {
  event.preventDefault()
  const sidebar = document.querySelector('#sidebar')
  roommates.showNewForm(sidebar)

  const newRoommateForm = document.querySelector('#new-roommate-form form')

  newRoommateForm.addEventListener('submit', (event) => {
      event.preventDefault()

      const {
        username, avatar, faction, street, suite, city, inputZip
      } = event.target

      data.push({
          username: username.value,
          avatar: avatar.value,
          faction: faction.value,
          address: {
              street: street.value,
              suite: suite.value,
              city: city.value,
              zipcode: inputZip.value
          }
        })
      roommates.showAll(roommatesContainer)

      const deleteButtons = Array.from(document.querySelectorAll('.roommate-delete-button'))
      deleteButtons.forEach(button => {
        button.addEventListener('click', deleteRoomate)
      })
    }
  )
  const cancelButton = document.querySelector('#new-roommate-cancel')
  cancelButton.addEventListener('click', (event) => {
    event.preventDefault()
    roommates.clearOldForm(sidebar)
  })

})
