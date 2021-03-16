import DragSlider from './DragSlider.js';



window.onload = () => {
    const app = document.querySelector('#app');
    const loader = document.querySelector('.load');
    app.style.display = 'block';
    loader.style.display = 'none';

    section6();
    setup_sec7();
}
window.oncontextmenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
}
const section6 = () => {
    const slider_sec6 = document.querySelector('.sec6-slider');
    const sliderinner_sec6 = document.querySelector('.sec6-slider-inner');
    const items_sec6 = document.querySelectorAll('.sec6-slider-inner >div');
    const DS = new DragSlider(slider_sec6, sliderinner_sec6, items_sec6);
    DS.setup();

    window.onresize = () => {
        DS.update();
    }
}