const menu = document.querySelector('.menu');
const memuBtn = document.querySelector('.toggleMenu');

memuBtn.addEventListener('click', () => {
    memuBtn.classList.toggle('menu-close');
    menu.classList.toggle('menu-hidden');
})