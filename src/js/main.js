var navbar = document.getElementById('navbar');
var links = document.getElementById('nav-links').getElementsByTagName('a');
var areas = document.getElementsByClassName('study-area');
var page = document.documentElement;

function updateNavbar() {
    // Shrink bar after scrolling down
    if (page.scrollTop > 20) {
        navbar.className = 'navbar small';
    } else {
        navbar.className = 'navbar'; // Reset size
    }

    var current = 0;
    for (var i = 0; i < areas.length; i++) {
        if (page.scrollTop + navbar.offsetHeight + 1 >= areas[i].offsetTop) {
            current = i;
        }
    }

    if (page.scrollTop + page.clientHeight >= page.scrollHeight - 1) {
        current = areas.length - 1;
    }

    for (var i = 0; i < links.length; i++) {
        links[i].className = '';
    }
    links[current].className = 'active';
}

window.onscroll = updateNavbar;
window.onresize = updateNavbar;
window.onload = updateNavbar;
updateNavbar();

var timer;
function smoothScroll() {
    clearInterval(timer);
    var area = document.getElementById(this.hash.substring(1));
    var start = page.scrollTop;
    var target = area.offsetTop - 80; 
    if (area.id == 'north') {
        target = 0;
    }
    var step = 0;
    timer = setInterval(function () {
        step++;
        page.scrollTop = start + (target - start) * step / 20;
        if (step == 20) {
            clearInterval(timer);
        }
    }, 20);
    return false; // Prevent the link's normal instant jump
}

for (var i = 0; i < links.length; i++) {
    links[i].onclick = smoothScroll;
}

// Quiet: show one study spot at a time
var slides = document.getElementsByClassName('slide');
var currentSlide = 0;

function showSlide() {
    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }
    for (var i = 0; i < slides.length; i++) {
        slides[i].className = 'slide';
    }
    slides[currentSlide].className = 'slide visible';
    document.getElementById('slide-number').textContent = (currentSlide + 1) + ' / ' + slides.length;
}

document.getElementById('previous-slide').onclick = function () {
    currentSlide--;
    showSlide();
};

document.getElementById('next-slide').onclick = function () {
    currentSlide++;
    showSlide();
};

// modal
var modal = document.getElementById('union-modal');
document.getElementById('union-details-button').onclick = function () {
    modal.className = 'modal show';
};
document.getElementById('close-modal').onclick = function () {
    modal.className = 'modal';
};
modal.onclick = function (event) {
    if (event.target == modal) {
        modal.className = 'modal';
    }
};
