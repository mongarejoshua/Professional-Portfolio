const modal = document.getElementById('customModal');
const submitBtn = document.getElementById('submitBtn');
const closeTriggers = document.querySelectorAll('.close-trigger');
const form = document.getElementById('contact')
const loader = document.getElementById('loader')

form.addEventListener('submit', function (event) {
    event.preventDefault();

    // loader.classList.add('active');
    // const formData = new FormData(form);
    // const data = Object.formEntries(formData.entries())
    // console.log("Data collected:", data)
    setTimeout(() => {
        loader.classList.remove('active')
        submitBtn.addEventListener('click', function () {
            modal.classList.add('show-state');
        });

    }, 2000);
})


function hideModal() {
    modal.classList.remove('show-state');
}
closeTriggers.forEach(btn => {
    btn.addEventListener('click', hideModal);
});
window.addEventListener('click', function (event) {
    if (event.target === modal) {
        hideModal();
    }
});