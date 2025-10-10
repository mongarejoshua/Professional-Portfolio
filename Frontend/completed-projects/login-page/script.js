
const form = document.getElementById('authForm');
const formTitle = document.getElementById('formTitle');
const userName = document.getElementById('username');
const email = document.getElementById('password');
const submitButton = document.getElementById('submit');
const toggleLink = document.getElementById('toggleLink');

// dashboard variables


// toggleLink.addEventListener('click', loginMode)
// function loginMode(event) {
//     event.preventDefault()
//     console.log('pass')
// }

submitButton.addEventListener('click', toDash)
function toDash(event) {
    event.preventDefault()
    window.location.href = 'dashboard.html'
}

