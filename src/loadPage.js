window.onload = () => {
    const app = document.querySelector('#app');
    const loader = document.querySelector('.load');
    app.style.display = 'block';
    loader.style.display = 'none';

    setup();
    setup_sec7();
}