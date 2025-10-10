const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentContent = '';

function displayContent() {
    display.innerText = currentContent;
}

buttons.forEach(button => {
    button.addEventListener('click', displayContent)
})
