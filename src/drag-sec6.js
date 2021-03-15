const slider_sec6 = document.querySelector('.sec6-slider');
const innerSlider_sec6 = document.querySelector('.sec6-slider-inner');
const items_sec6 = document.querySelectorAll('.sec6-slider-inner >div');
let index_sec6;
let pressed_sec6 = false;
let startX_sec6, x_sec6, scrollLeft_sec6;
let translateX_sec6, offsetX_sec6;

const setup = () => {
    let item_width = items_sec6[0].clientWidth;
    offsetX_sec6 = 0;
    index_sec6 = 3;
    innerSlider_sec6.style.transform = `translateX(${item_width * -index_sec6}px)`;
};

const m_down = (e) => {
    translateX_sec6 = document.defaultView.getComputedStyle(innerSlider_sec6, null).transform.split(',')[4].trim();
    pressed_sec6 = true;
    slider_sec6.style.cursor = 'grabbing';
    startX_sec6 = e.pageX - slider_sec6.offsetParent.offsetLeft;
    scrollLeft_sec6 = slider_sec6.scrollLeft;
    innerSlider_sec6.style.transition = 'none';
};

const m_move = (e) => {
    let item_width = items_sec6[0].clientWidth;
    let _translateX = document.defaultView.getComputedStyle(innerSlider_sec6, null).transform.split(',')[4].trim();
    x_sec6 = e.pageX - slider_sec6.offsetParent.offsetLeft;
    offsetX_sec6 = `${scrollLeft_sec6 - (x_sec6 - startX_sec6)}`;
    innerSlider_sec6.style.transform = `translateX(${translateX_sec6 - offsetX_sec6}px)`;

    if (_translateX < (item_width * -8)) {
        translateX_sec6 = (item_width * -2) + parseInt(offsetX_sec6);
    } else if (_translateX > 0) {
        translateX_sec6 = (item_width * -6) + parseInt(offsetX_sec6);
    }
}

const m_up = () => {
    if (offsetX_sec6 === 0) return;
    itemSelector();
    offsetX_sec6 = 0;
}

const itemSelector = () => {
    let item_width = items_sec6[0].clientWidth;
    let _translateX = document.defaultView.getComputedStyle(innerSlider_sec6, null).transform.split(',')[4].trim();

    if (offsetX_sec6 < 0) {
        if (_translateX <= (item_width * 0) && _translateX >= (item_width * -1)) {
            index_sec6 = 0;
            setActive(index_sec6);
        } else if (_translateX <= (item_width * -1) && _translateX >= (item_width * -2)) {
            index_sec6 = 1;
            setActive(index_sec6);
        } else if (_translateX <= (item_width * -2) && _translateX >= (item_width * -3)) {
            index_sec6 = 2;
            setActive(index_sec6);
        } else if (_translateX <= (item_width * -3) && _translateX >= (item_width * -4)) {
            index_sec6 = 3;
            setActive(index_sec6);
        } else if (_translateX <= (item_width * -4) && _translateX >= (item_width * -5)) {
            index_sec6 = 4;
            setActive(index_sec6);
        } else if (_translateX <= (item_width * -5) && _translateX >= (item_width * -6)) {
            index_sec6 = 5;
            setActive(index_sec6);
        } else if (_translateX <= (item_width * -6) && _translateX >= (item_width * -7)) {
            index_sec6 = 6;
            setActive(index_sec6);
        } else if (_translateX <= (item_width * -7) && _translateX >= (item_width * -8)) {
            index_sec6 = 7;
            setActive(index_sec6);
        }
    } else if (offsetX_sec6 > 0) {
        if (_translateX <= (item_width * 0) && _translateX >= (item_width * -1)) {
            index_sec6 = 1;
            setActive(index_sec6);
        } else if (_translateX <= (item_width * -1) && _translateX >= (item_width * -2)) {
            index_sec6 = 2;
            setActive(index_sec6);
        } else if (_translateX <= (item_width * -2) && _translateX >= (item_width * -3)) {
            index_sec6 = 3;
            setActive(index_sec6);
        } else if (_translateX <= (item_width * -3) && _translateX >= (item_width * -4)) {
            index_sec6 = 4;
            setActive(index_sec6);
        } else if (_translateX <= (item_width * -4) && _translateX >= (item_width * -5)) {
            index_sec6 = 5;
            setActive(index_sec6);
        } else if (_translateX <= (item_width * -5) && _translateX >= (item_width * -6)) {
            index_sec6 = 6;
            setActive(index_sec6);
        } else if (_translateX <= (item_width * -6) && _translateX >= (item_width * -7)) {
            index_sec6 = 7;
            setActive(index_sec6);
        } else if (_translateX <= (item_width * -7) && _translateX >= (item_width * -8)) {
            index_sec6 = 8;
            setActive(index_sec6);
        }
    }
};

const setActive = (value) => {
    let item_width = items_sec6[0].clientWidth;
    removeActive();
    items_sec6[value].classList.add('act');
    innerSlider_sec6.style.transition = 'all .25s ease 0s';
    innerSlider_sec6.style.transform = `translateX(${item_width * -value}px)`;
};

const removeActive = () => {
    items_sec6.forEach(el => {
        el.classList.remove('act');
    })
};

slider_sec6.addEventListener('mousedown', (e) => {
    m_down(e);
})
window.addEventListener('mouseup', () => {
    pressed_sec6 = false;
    slider_sec6.style.cursor = 'default';
    m_up();
})
slider_sec6.addEventListener('mousemove', (e) => {
    if (!pressed_sec6) return;
    e.preventDefault();
    m_move(e);
})

setup();