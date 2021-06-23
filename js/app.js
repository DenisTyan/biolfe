let mainSlider = new Swiper('.main-slider__inner', {

	slidesPerView: 1,
	autoHeight: true,
	speed: 500,
	loop: true,
	effect: 'fade',
	autoplay: true,
    
	navigation: {
		nextEl: '.main-slider__arrows-next',
		prevEl: '.main-slider__arrows-prev',
	},

});


let teamSlider = new Swiper('.team__slider', {

	slidesPerView: 3,
	autoHeight: true,
    spaceBetween: 30,
	speed: 500,
	loop: true,
	autoplay: true,

    pagination: {
		el: '.team__slider-pagination',
        clickable: true,
	},

});
function map(n) {
    google.maps.Map.prototype.setCenterWithOffset = function (latlng, offsetX, offsetY) {
        let map = this;
        let ov = new google.maps.OverlayView();
        ov.onAdd = function () {
            let proj = this.getProjection();
            let aPoint = proj.fromLatLngToContainerPixel(latlng);
            aPoint.x = aPoint.x + offsetX;
            aPoint.y = aPoint.y + offsetY;
            map.panTo(proj.fromContainerPixelToLatLng(aPoint));
        }
        ov.draw = function () { };
        ov.setMap(this);
    };
    let markers = new Array();
    let locations = [
        [new google.maps.LatLng(41.328948949540944, 69.3247594511747)],
    ]
    let options = {
        zoom: 12,
        panControl: false,
        mapTypeControl: false,
        center: locations[0][0],
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    let map = new google.maps.Map(document.getElementById('map'), options);
    
    for (var i = 0; i < locations.length; i++) {
        var marker = new google.maps.Marker({
            position: locations[i][0],
            map: map,
        });
        markers.push(marker);
    }
}


map(1);

// Body Lock
let unlock = true;
let delay = 100;

function body_lock(delay) {
	let body = document.querySelector("body");
	if (body.classList.contains('_lock')) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}
function body_lock_remove(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			body.classList.remove("_lock");
		}, delay);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
function body_lock_add(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		body.classList.add("_lock");

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}

// Modal
const modalBtn = document.querySelectorAll('.btn-modal'),
    modalOverlay = document.querySelectorAll('.modal__content'),
    overlay = document.querySelector('.overlay'),
    modalBtnClose = document.querySelectorAll('.modal__btn-close');


modalBtn.forEach((el) => {

    el.addEventListener('click', (e) => {
        let path = e.currentTarget.getAttribute('data-path');
        document.querySelector(`[data-target="${path}"]`).classList.add('_active');
        overlay.classList.add('_active');
        body_lock_add(delay);
    });

});


function closeModalIfHasClassNavMenu() {

    if (document.querySelector('.nav-menu')) {
        if (!document.querySelector('.nav-menu').classList.contains('_resize')) {
            body_lock_remove(delay);
        }
    }else {
        body_lock_remove(delay);
    }

}

modalOverlay.forEach((el) => {

    el.addEventListener('click', (e) => {
        if (e.target == el) {
            el.closest('.modal').classList.remove('_active');
            overlay.classList.remove('_active');
            closeModalIfHasClassNavMenu();
        }
    });

});


modalBtnClose.forEach((el) => {

    el.addEventListener('click', (e) => {
        el.closest('.modal').classList.remove('_active');
        overlay.classList.remove('_active');
        closeModalIfHasClassNavMenu();
    });

});


let scroll = new SmoothScroll('a[href*="#"]', {

	speed: 500,
	easing: 'easeInOutQuad',
	speedAsDuration: true

});

AOS.init({

	once: true,
	delay: 300

});