// --- 1. KONTROL MUSIK LATAR ---
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');

let isPlaying = false;

function playAudio() {
    bgMusic.play().then(() => {
        isPlaying = true;
        musicIcon.classList.add('fa-spin');
        document.removeEventListener('click', playAudio);
        document.removeEventListener('touchstart', playAudio);
    }).catch(error => {
        console.log("Autoplay dicegah browser, menunggu interaksi user.");
    });
}

document.addEventListener('click', playAudio);
document.addEventListener('touchstart', playAudio);

if (musicToggle) {
    musicToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        if (isPlaying) {
            bgMusic.pause();
            isPlaying = false;
            musicIcon.classList.remove('fa-spin');
        } else {
            bgMusic.play();
            isPlaying = true;
            musicIcon.classList.add('fa-spin');
        }
    });
}


// --- 2. COUNTDOWN TIMER MENUJU 2 OKTOBER 2026 ---
const targetDate = new Date('October 2, 2026 19:30:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const gap = targetDate - now;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const textDay = Math.floor(gap / day);
    const textHour = Math.floor((gap % day) / hour);
    const textMinute = Math.floor((gap % hour) / minute);
    const textSecond = Math.floor((gap % minute) / second);

    if (document.getElementById('days')) {
        document.getElementById('days').innerText = textDay < 10 ? '0' + textDay : textDay;
        document.getElementById('hours').innerText = textHour < 10 ? '0' + textHour : textHour;
        document.getElementById('minutes').innerText = textMinute < 10 ? '0' + textMinute : textMinute;
        document.getElementById('seconds').innerText = textSecond < 10 ? '0' + textSecond : textSecond;
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();


// --- 3. EFEK ANIMASI SCROLL (INTERSECTION OBSERVER - AMAN UNTUK FILE LOKAL) ---
document.addEventListener("DOMContentLoaded", function() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Animasi akan trigger saat elemen terlihat 15% di layar
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));
});