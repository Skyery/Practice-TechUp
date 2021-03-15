const nextBtn = document.getElementById('next');
const preBtn = document.getElementById('pre');
const cube = document.querySelector('[data-cube]');
const sections = document.querySelectorAll('[data-artSections]');
const slide_content = document.querySelector('.slide-wrapper');
let slide_Left = document.querySelector('.active >.slide-content-left');
let curDeg = 0;
let state = 1;
let timer;

const nextSection = () => {
    curDeg -= 90;
    cube.style.transform = 'rotateY(' + curDeg + 'deg)';
    clearSection();
    if (state === sections.length) {
        state = sections.length - (sections.length - 1);
        sections[state - 1].classList.add('active');
        slide_Left = document.querySelector('.active >.slide-content-left');
        mouseArea();
    } else {
        state++;
        sections[state - 1].classList.add('active');
        slide_Left = document.querySelector('.active >.slide-content-left');
        mouseArea();
    }
}
const prewSection = () => {
    curDeg += 90;
    cube.style.transform = 'rotateY(' + curDeg + 'deg)';
    clearSection();
    if (state === sections.length - (sections.length - 1)) {
        state = sections.length;
        sections[state - 1].classList.add('active');
        slide_Left = document.querySelector('.active >.slide-content-left');
        mouseArea();
    } else {
        state--;
        sections[state - 1].classList.add('active');
        slide_Left = document.querySelector('.active >.slide-content-left');
        mouseArea();
    }
}
const clearSection = () => {
    sections.forEach((el) => {
        el.classList.remove('active');
    })
}

const mouseArea = () => {
    slide_Left.addEventListener('mouseenter', () => {
        clearInterval(timer);
    })
    slide_Left.addEventListener('mouseleave', () => {
        startCountDown();
    })

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            startCountDown();
        } else {
            clearInterval(timer);
        }
    })
}
const startCountDown = () => {
    if (timer) clearInterval(timer);

    timer = setInterval(() => {
        nextSection();
    }, 5000);
}

nextBtn.addEventListener('click', () => {
    nextSection();
    startCountDown();
})
preBtn.addEventListener('click', () => {
    prewSection();
    startCountDown();
})
slide_content.addEventListener('mousemove', (e) => {
    let speed = 1;
    const x = (window.innerWidth - e.pageX * speed) / 100;
    const y = (window.innerHeight - e.pageY * speed) / 100;
    slide_Left.style.transform = `translateX(${x}px) translateY(${y}px)`;
})

startCountDown();
mouseArea();