const header = document.querySelector('.containerBot');
window.addEventListener('scroll', () => {
    header.classList.toggle('fixTop', scrollY > 60);
})