const btn = document.querySelector('.j-btn-test');

const screenWidth = window.screen.width;
const screenHeight = window.screen.height;

btn.addEventListener('click', () => {
    alert(`screen width = ${screenWidth}, screen height = ${screenHeight}`);
});
