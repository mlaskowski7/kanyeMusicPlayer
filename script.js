const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');

const songs = [
    {
        name: 'song1',
        title: 'Heaven and Hell',
        artist: 'Kanye West'
    },
    {
        name: 'song2',
        title: 'Hurricane',
        artist: 'Kanye West'
    },
    {
        name: 'song3',
        title: 'Junya',
        artist: 'Kanye West'
    },
    {
        name: 'song4',
        title: 'True Love',
        artist: 'Kanye West & XXXTENTACION'
    },
    
];


let isPlaying = false;


function playSong(){
    isPlaying = true;
    music.play();
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','Pause');
}

function pauseSong(){
    isPlaying = false;
    music.pause();
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','Play');
}

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

function loadSong(song){
    title.textContent = song.title;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

let songIndex = Math.floor(Math.random() * 4);

function nextSong(){
    if(songIndex + 1 <= songs.length-1){
        songIndex += 1;
    } else{
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
    
}

function prevSong(){
    if(songIndex - 1 >= 0){
        songIndex -= 1;
    } else{
        songIndex = songs.length-1;
    }
    
    loadSong(songs[songIndex]);
    playSong();
}

loadSong(songs[songIndex]);
updateProgressBar();

function updateProgressBar(event){
    if(isPlaying){
        const {duration, currentTime} = event.srcElement;
        const progressPercent = currentTime/duration*100;
        progress.style.width = `${progressPercent}%`;

        const durationMin = Math.floor(duration/60) ;
        let durationSec = Math.floor(duration%60);
        if(durationSec < 10){
            durationSec = `0${durationSec}`;
        }
        
        if(durationSec){
            durationElement.textContent = `${durationMin}:${durationSec}`;
        }

        const currentTimeMin = Math.floor(currentTime/60) ;
        let currentTimeSec = Math.floor(currentTime%60);
        if(currentTimeSec < 10){
            currentTimeSec = `0${currentTimeSec}`;
        }
        currentTimeElement.textContent = `${currentTimeMin}:${currentTimeSec}`;

    }
}

function setProgressBar(event){
    const width = this.clientWidth;
    const clickX = event.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

nextBtn.addEventListener('click',nextSong);
prevBtn.addEventListener('click',prevSong);
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended',nextSong);
progressContainer.addEventListener('click',setProgressBar);