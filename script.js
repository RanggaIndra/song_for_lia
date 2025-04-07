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
const songs = ["Phil Collins - You'll Be In My Heart", "Porter Robinson - Sweet Time"];

const songLyrics = {
    "Porter Robinson - Sweet Time": `Child of ours
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
    Resenting the way things are`,

    "Phil Collins - You'll Be In My Heart": `Come stop your crying
    It will be alright
    Just take my hand
    Hold it tight

    I will protect you
    From all around you
    I will be here
    Don't you cry

    For one so small
    You seem so strong
    My arms will hold you
    Keep you safe and warm
    This bond between us
    Can't be broken
    I will be here
    Don't you cry

    Cause you'll be in my heart
    Yes, you'll be in my heart
    From this day on
    Now and forever more

    You'll be in my heart
    No matter what they say
    You'll be here in my heart
    Always

    Why can't they understand the way we feel
    They just don't trust what they can't explain
    I know we're different, but deep inside us
    We're not that different at all

    And you'll be in my heart
    Yes you'll be in my heart
    From this day on
    Now and forever more

    Don't listen to them
    'Cause what do they know
    We need each other, to have, to hold
    They'll see in time, I know

    When destiny calls you, you must be strong
    I may not be with you
    But you've got to hold on
    They'll see in time, I know
    We'll show them together

    And you'll be in my heart
    Yes you'll be in my heart
    From this day on
    Now and forever more

    You'll be in my heart
    No matter what they say
    You'll be here in my heart
    Always
    Always

    Just look over your shoulder
    Just look over your shoulder
    Just look over your shoulder
    I'll be there
    Always`
};

// Keep track of song
let songIndex = 0; // Start with the first song (index 0)

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
    title.innerText = song;
    // Fix the file paths by removing extra spaces
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.png`;

    lyricsContainer.innerText = songLyrics[song] || 'Lyrics not available';
}

function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    // Call audio.play() only once
    audio.play();
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    // Call audio.pause() only once
    audio.pause();
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
    progress.style.width = `${progressPercent}%`; // Removed extra space
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