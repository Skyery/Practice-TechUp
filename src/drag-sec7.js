const slider_sec7 = document.querySelector('.sec7-slider');
const innerSlider_sec7 = document.querySelector('.sec7-slider-inner');
const items_sec7 = document.querySelectorAll('.sec7-slider-inner >div');

const txtSlider_sec7 = document.querySelector('.sec7-txtSlider');
const innertxtSlider_sec7 = document.querySelector('.sec7-txtSlider-inner');
const txtItem_sec7 = document.querySelectorAll('.sec7-txtSlider-inner >div');

const prevBtn_sec7 = document.querySelector('.sec7-prev');
const nextBtn_sec7 = document.querySelector('.sec7-next');

let index_sec7, txtIndex_sec7;
let pressed_sec7 = false;
let startX_sec7, x_sec7, scrollLeft_sec7;
let translateX_sec7, offsetX_sec7;

const setup_sec7 = () => {
    offsetX_sec7 = 0;
    index_sec7 = 3;
    txtIndex_sec7 = 1;
    setActive_sec7();
};

const m_down_sec7 = (e) => {
    translateX_sec7 = document.defaultView.getComputedStyle(innerSlider_sec7, null).transform.split(',')[4].trim();
    pressed_sec7 = true;
    startX_sec7 = e.pageX - slider_sec7.offsetParent.offsetLeft;
    scrollLeft_sec7 = slider_sec7.scrollLeft;
    innerSlider_sec7.style.transition = 'none';
    innertxtSlider_sec7.style.transition = 'none'
};

const m_move_sec7 = (e) => {
    let item_width = items_sec7[0].clientWidth;
    let _translateX = document.defaultView.getComputedStyle(innerSlider_sec7, null).transform.split(',')[4].trim();
    x_sec7 = e.pageX - slider_sec7.offsetParent.offsetLeft;
    offsetX_sec7 = `${scrollLeft_sec7 - (x_sec7 - startX_sec7)}`;
    innerSlider_sec7.style.transform = `translateX(${translateX_sec7 - offsetX_sec7}px)`;

    if (_translateX < (item_width * -6)) {
        translateX_sec7 = (item_width * -3) + parseInt(offsetX_sec7);
    } else if (_translateX > 0) {
        translateX_sec7 = (item_width * -6) + parseInt(offsetX_sec7);
    }
}

const m_up_sec7 = () => {
    if (offsetX_sec7 === 0) return;
    itemSelector_sec7();
    offsetX_sec7 = 0;
}

const itemSelector_sec7 = () => {
    let item_width = items_sec7[0].clientWidth;
    let _translateX = document.defaultView.getComputedStyle(innerSlider_sec7, null).transform.split(',')[4].trim();

    if (offsetX_sec7 < 0) {
        if (_translateX <= (item_width * 0) && _translateX >= (item_width * -1)) {
            index_sec7 = 0;
            txtIndex_sec7 = 1;
            setActive_sec7();
        } else if (_translateX <= (item_width * -1) && _translateX >= (item_width * -2)) {
            index_sec7 = 1;
            txtIndex_sec7 = 2;
            setActive_sec7();
        } else if (_translateX <= (item_width * -2) && _translateX >= (item_width * -3)) {
            index_sec7 = 2;
            txtIndex_sec7 = 0;
            setActive_sec7();
        } else if (_translateX <= (item_width * -3) && _translateX >= (item_width * -4)) {
            index_sec7 = 3;
            txtIndex_sec7 = 1;
            setActive_sec7();
        } else if (_translateX <= (item_width * -4) && _translateX >= (item_width * -5)) {
            index_sec7 = 4;
            txtIndex_sec7 = 2;
            setActive_sec7();
        } else if (_translateX <= (item_width * -5) && _translateX >= (item_width * -6)) {
            index_sec7 = 5;
            txtIndex_sec7 = 0;
            setActive_sec7();
        }
    } else if (offsetX_sec7 > 0) {
        if (_translateX <= (item_width * 0) && _translateX >= (item_width * -1)) {
            index_sec7 = 1;
            txtIndex_sec7 = 2;
            setActive_sec7();
        } else if (_translateX <= (item_width * -1) && _translateX >= (item_width * -2)) {
            index_sec7 = 2;
            txtIndex_sec7 = 0;
            setActive_sec7();
        } else if (_translateX <= (item_width * -2) && _translateX >= (item_width * -3)) {
            index_sec7 = 3;
            txtIndex_sec7 = 1;
            setActive_sec7();
        } else if (_translateX <= (item_width * -3) && _translateX >= (item_width * -4)) {
            index_sec7 = 4;
            txtIndex_sec7 = 2;
            setActive_sec7();
        } else if (_translateX <= (item_width * -4) && _translateX >= (item_width * -5)) {
            index_sec7 = 5;
            txtIndex_sec7 = 0;
            setActive_sec7();
        } else if (_translateX <= (item_width * -5) && _translateX >= (item_width * -6)) {
            index_sec7 = 6;
            txtIndex_sec7 = 1;
            setActive_sec7();
        }
    }
};

const setActive_sec7 = () => {
    let item_width = items_sec7[0].clientWidth;
    let txtItem_width = txtItem_sec7[0].clientWidth;
    removeActive_sec7();
    items_sec7[index_sec7 + 1].classList.add('act');
    items_sec7[index_sec7 + 1].querySelector('.sec7-img >img').classList.add('sec7-mid');
    innerSlider_sec7.style.transition = 'all .25s ease 0s';
    innertxtSlider_sec7.style.transition = 'all .25s ease 0s';
    innerSlider_sec7.style.transform = `translateX(${item_width * -index_sec7}px)`;
    innertxtSlider_sec7.style.transform = `translateX(${txtItem_width * -txtIndex_sec7}px)`;
};

const removeActive_sec7 = () => {
    items_sec7.forEach(el => {
        el.classList.remove('act');
        el.querySelector('.sec7-img >img').classList.remove('sec7-mid');
    })
};

const nextSection_sec7 = () => {
    index_sec7++;
    txtIndex_sec7++;

    if (index_sec7 > 4) {
        index_sec7 = 2;
    }
    if (txtIndex_sec7 > 2) {
        txtIndex_sec7 = 0;
    }
    setActive_sec7();
}

const prevSection_sec7 = () => {
    index_sec7--;
    txtIndex_sec7--;

    if (index_sec7 < 2) {
        index_sec7 = 4;
    }
    if (txtIndex_sec7 < 0) {
        txtIndex_sec7 = 2;
    }
    setActive_sec7();
}

slider_sec7.addEventListener('mousedown', (e) => {
    slider_sec7.style.cursor = 'grabbing';
    m_down_sec7(e);
})
slider_sec7.addEventListener('mouseenter', () => {
    slider_sec7.style.cursor = 'grab';
})
window.addEventListener('mouseup', () => {
    pressed_sec7 = false;
    slider_sec7.style.cursor = 'grab';
    m_up_sec7();
})
slider_sec7.addEventListener('mousemove', (e) => {
    if (!pressed_sec7) return;
    e.preventDefault();
    m_move_sec7(e);
})
nextBtn_sec7.addEventListener('click', () => {
    nextSection_sec7();
})
prevBtn_sec7.addEventListener('click', () => {
    prevSection_sec7();
})

window.onresize = () => {
    setup_sec7();
    setup();
};

setup_sec7();