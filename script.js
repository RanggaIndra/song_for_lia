const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');
const lyricsContainer = document.querySelector('.lyrics p');

// Song Titles
const songs = ['Porter Robinson - Sweet Time'];

const songLyrics = {
    'Porter Robinson - Sweet Time': `Child of ours
    Counting the days 'til the summer come
    But you don't live forever
    Your mother will one day bring you home
    And it feels so stupid, 'cause I wasn't scared of this before
    But since I have met you, I don't wanna die no more
    So take a long time
    'Cause, oh, the world is lucky to be your home
    I know I need a next life
    'Cause I'm not satisfied to know you just once
    So take a long time
    Oh, the world is lucky to be your home
    I know I need a next life
    Not satisfied to know you just once
    Oh, oh, oh, oh, oh, oh, oh, oh, oh
    To live, we're dying
    Why wouldn't we see our world as dark?
    But I won't spend time
    Resenting the way things are
    So take a long time
    All the world is lucky to be your home
    I know I need a next life
    Not satisfied to know you just once
    Oh, oh, oh, oh, oh, oh, oh, oh, oh
    Oh, oh, oh, oh, oh, oh, oh, oh, oh
    So take a long time
    Oh, the world is lucky to be your home
    I know I need a next life
    Not satisfied to know you just once
    So take a long time
    Oh, the world is lucky to be your home
    I know I need a next life
    Not satisfied to know you just once
    And I won't spend time
    Resenting the way things are`
};

// Keep track of song
let songIndex = 0;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.png`;

    lyricsContainer.innerText = songLyrics[song] || 'Lyrics not available';
}

function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();

    audio.play()
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();

    audio.pause()
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);