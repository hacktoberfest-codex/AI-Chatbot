const popupContainer = document.querySelector('.popup-container');
const okButton = document.getElementById('okButton');

window.onload = function() {
    popupContainer.style.display = 'flex';
};

okButton.addEventListener('click', function() {
    popupContainer.style.display = 'none';
});
