export default class DragSlider {
    constructor(slider, sliderinner, items) {
        this.slider = slider;
        this.innerslider = sliderinner;
        this.items = items;

        this.item_show = window.getComputedStyle(this.slider, null).getPropertyValue("--item-show");
        this.item_width = this.items[0].clientWidth;
        this.pressed = false;
        this.x = 0;
        this._x = 0;
        this.scrollLeft = 0;
        this.offsetX = 0;
        this.translateX = 0;
        this._translateX = 0;
        this._item_show = 0;
        this.clones = [];
    }
    setup() {
        this._item_show = this.item_show;
        if (+this._item_show === 1) { this._item_show++; }
        this.addListener();
        this.createClone();
        this.innerslider.style.transform = `translateX(${this.item_width * - (this._item_show - 1)}px)`;
    }
    addListener() {
        this.items.forEach((el) => {
            const sliderImg = el.querySelector('img');
            sliderImg.addEventListener('dragstart', (e) => e.preventDefault());
        })
        this.slider.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.touchStart(e);
        });
        this.slider.addEventListener('touchmove', (e) => {
            if (this.getTouchMod(e)) return;
            e.preventDefault();
            this.touchmove(e);
        })
        this.slider.addEventListener('touchend', () => {
            this.touchEnd();
        });

        this.slider.addEventListener('mousedown', (e) => {
            e.preventDefault();
            this.touchStart(e);
        })
        this.slider.addEventListener('mousemove', (e) => {
            if (!this.getTouchMod(e)) return;
            e.preventDefault();
            this.touchmove(e)
        })
        this.slider.addEventListener('mouseup', () => {
            this.touchEnd();
        })
    }
    update() {
        this.item_width = this.items[0].clientWidth;
        this.item_show = window.getComputedStyle(this.slider, null).getPropertyValue("--item-show");
        this.offsetX = 0;
        if (this._item_show != this.item_show) {
            this.removeClone();
            this.createClone();
            this._item_show = this.item_show;
        }

        if (+this._item_show === 1) { this._item_show++; }

        this.innerslider.style.transform = `translateX(${this.item_width * -(this._item_show - 1)}px)`;
    }
    createClone() {
        let r_i = 0;
        let l_i = this.items.length - 1;
        let i;

        (+this.item_show) === 1 ? i = 1 : i = this.item_show - 1;

        while (r_i < i) {
            //clone right
            let item = this.items[r_i];
            let clone = item.cloneNode(true);
            clone.classList.add('clone');
            clone.addEventListener('dragstart', (e) => e.preventDefault());
            this.innerslider.appendChild(clone);
            this.clones.push(clone);
            r_i++;
            //clone left
            let _item = this.items[l_i];
            let _clone = _item.cloneNode(true);
            _clone.classList.add('clone');
            _clone.addEventListener('dragstart', (e) => e.preventDefault());
            this.innerslider.prepend(_clone);
            this.clones.push(_clone);
            l_i--;
        }
    }
    removeClone() {
        this.clones.forEach(el => {
            el.remove();
        })
        this.clones = [];
    }
    itemSelect() {
        const dir = this.offsetX < 0 ? true : false;
        let i = 0;
        while (i < (this.items.length + 2)) {
            if (this._translateX <= (this.item_width * -i) && this._translateX >= (this.item_width * -(i + 1))) {
                dir ? this.itemLock(i) : this.itemLock(i + 1);
            }
            i++;
        }
        this.offsetX = 0;
    }
    itemLock(i) {
        this.innerslider.style.transition = 'all .25s ease 0s';
        this.innerslider.style.transform = `translateX(${this.item_width * -i}px)`;
    }
    getPosition(e) {
        return e.type.includes('mouse')
            ? e.pageX - this.slider.offsetParent.offsetLeft
            : e.touches[0].clientX;
    }
    getTouchMod(e) {
        return e.type.includes('mouse') ? true : false;
    }
    touchStart(e) {
        this.translateX = document.defaultView.getComputedStyle(this.innerslider, null).transform.split(',')[4].trim();
        this.pressed = true;
        this.slider.style.cursor = 'grabbing';
        this.x = this.getPosition(e);
        this.scrollLeft = this.slider.scrollLeft;
        this.innerslider.style.transition = 'none';
    }
    touchmove(e) {
        if (!this.pressed) return;

        this._translateX = document.defaultView.getComputedStyle(this.innerslider, null).transform.split(',')[4].trim();
        this._x = this.getPosition(e);
        this.offsetX = `${this.scrollLeft - (this._x - this.x)}`;
        this.innerslider.style.transform = `translateX(${this.translateX - this.offsetX}px)`;

        if (this._translateX < (this.item_width * -(this.items.length + ((this.clones.length / 2) - 1)))) {
            this.translateX = (this.item_width * -(this.clones.length - this._item_show)) + parseInt(this.offsetX);
        } else if (this._translateX > 0) {
            this.translateX = (this.item_width * -(this.items.length)) + parseInt(this.offsetX);
        }
    }
    touchEnd() {
        this.pressed = false;
        this.slider.style.cursor = 'default';
        if (this.offsetX === 0) return;

        this.itemSelect();
    }
}