const slider = document.querySelector('.sec4-slider');
const innerSlider = document.querySelector('.sec4-slider-inner');
let pressed = false;
let startX, x, scrollLeft;

slider.addEventListener('mousedown', (e) => {
    pressed = true;
    slider.style.cursor = 'grabbing';
    startX = e.pageX - slider.offsetParent.offsetLeft;
    scrollLeft = slider.scrollLeft;
})
slider.addEventListener('mouseenter', () => {
    slider.style.cursor = 'grab';
})
window.addEventListener('mouseup', () => {
    pressed = false;
    slider.style.cursor = 'grab';
})
slider.addEventListener('mousemove', (e) => {
    if (!pressed) return;
    e.preventDefault();

    x = e.pageX - slider.offsetParent.offsetLeft;
    slider.scrollLeft = `${scrollLeft - (x - startX)}`;
})