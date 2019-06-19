class Slider {
    constructor() {
        let _self = this;
        this.slides = $('.slider .slide');
        this.slides.each((index, element) => {
            _self[`slide${index}`] = $(element);
        });
        this.slides.on("touchmove", (event) => {
            event.preventDefault();
            console.log({
                event
            });
        });
        this.next = $(".slider .indicator.right");
        this.previous = $(".slider .indicator.left");
        this.next.click((event) => this.length > 1 && !this.isActive && this.nextSlide());
        this.next.on("mousedown touchstart", () => this.next.addClass("click"));
        this.next.on("mouseup mouseleave touchend touchcancel", () => this.next.removeClass("click"));
        this.previous.click((event) => this.length > 1 && !this.isActive && this.previousSlide());
        this.previous.on("mousedown touchstart", () => this.previous.addClass("click"));
        this.previous.on("mouseup mouseleave touchend touchcancel", () => this.previous.removeClass("click"));
        this.activeIndex = 0;
        this.length = this.slides.length;
        this.isActive = false;
    }
    nextSlide() {
        this.isActive = true;
        this[`slide${this.activeIndex}`].addClass("slide-go-to-left");
        this[`slide${this.activeIndex+1}`] ?
            this[`slide${this.activeIndex+1}`].addClass("slide-come-from-right active") :
            this[`slide0`].addClass("slide-come-from-right active");
        setTimeout(() => {
            this[`slide${this.activeIndex}`].removeClass("slide-go-to-left active");
            this[`slide${this.activeIndex+1}`] ?
                this[`slide${this.activeIndex+1}`].removeClass("slide-come-from-right") :
                this[`slide0`].removeClass("slide-come-from-right");
            this.activeIndex = this[`slide${this.activeIndex+1}`] ? this.activeIndex + 1 : 0;
            this.isActive = false;
        }, 1000);
    }
    previousSlide() {
        this.isActive = true;
        this[`slide${this.activeIndex}`].addClass("slide-go-to-right");
        this[`slide${this.activeIndex-1}`] ?
            this[`slide${this.activeIndex-1}`].addClass("slide-come-from-left active") :
            this[`slide${this.length-1}`].addClass("slide-come-from-left active");
        setTimeout(() => {
            this[`slide${this.activeIndex}`].removeClass("slide-go-to-right active");
            this[`slide${this.activeIndex-1}`] ?
                this[`slide${this.activeIndex-1}`].removeClass("slide-come-from-left") :
                this[`slide${this.length-1}`].removeClass("slide-come-from-left");
            this.activeIndex = this[`slide${this.activeIndex-1}`] ? this.activeIndex - 1 : this.length - 1;
            this.isActive = false;
        }, 1000);
    }
}
var slider = new Slider();