const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

let isPlaying = false;


function playSong(){
    isPlaying = true;
    music.play();
    playBtn.classList.replace('fa-play','fa-pause');
}

function pauseSong(){
    isPlaying = false;
    music.pause();
    playBtn.classList.replace('fa-pause','fa-play');
}

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));