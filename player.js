
const audioPlayer = document.getElementById('audioPlayer');
const playIcon = document.querySelector('#playIcon');
const titleElement = document.querySelector('.title');
const artistImage = document.querySelector('#artist');
const artistName = document.querySelector('#name');
const progressBar = document.getElementById('Progress');
const currentTimeElement = document.getElementById('start');
const totalTimeElement = document.getElementById('end');

let currentSongIndex = 0;
const artistNames = ['swati mishra', 'munna mishra , ankush raj mishra', 'sachet parampara', 'Alisha Chinai', 'Jubin Nautiyal',
    'Kaushik-Guddu, Raghav Chaitanya',
    'Jassa Dhillon and Thiarajxtt', 'Azaan Sami Khan', 'Jasleen Royal, B Praak', 'Darshan Raval and Javed-Mohsin', 'Arijit Singh',
     ' Darshan Raval and Aditi Singh Sharma','Arijit Singh ,'];

const songTitles = ['Ram Ayenge', 'Bhagwadhari', 'Ram siya ram', 'Tu aj menu nede nede',
    'Raatan Lambiyan', 'Dil Ek Villain Returns', 'Spain', ' Ik Lamha', 'Ranjha', 'Kabhi Tumhhe', ' Dil Ka Dariya Beh Hi Gaya', 'Bekhudi',' Ho Saath Kangan Lekar'
];

const songSources = ['songs.mp3/Ram-Aayenge(PaglaSongs).mp3', 'songs.mp3/Bhagwadhari Remix 2023 BUCKS BOY [128 Kbps]-(Pagalworld.gay).mp3',
    'songs.mp3/Ram-Siya-Ram(PagalWorld).mp3', 'songs.mp3/Tu-Aaj-Mainu-Khud-Ch-Sama-Len-De(PagalWorldl).mp3',
    'songs.mp3/Raataan-Lambiyan(pagalworld.co.uk).mp3', 'songs.mp3/Dil-(Ek-Villain-Returns)(PagalWorldl).mp3',
    'songs.mp3/Spain(PagalWorld).mp3', 'songs.mp3/Ik-Lamha(PagalWorld).mp3', 'songs.mp3/Ranjha(PagalWorld).mp3', 'songs.mp3/Kabhii-Tumhhe(PagalWorld).mp3', 
    'songs.mp3/Dil-Ka-Dariya(PagalWorld).mp3', 'songs.mp3/Dhundle-Hue-Hai-Manzar-Mere(PagalWorld).mp3','songs.mp3/Oo-Sath-Kangan-Leke-Aana(PagalWorld).mp3'
];

const artistImageSources = ['images/secondp8.png', 'images/secondp.png', 'images/secondp7.png', 'images/secondp1.png', 'images/secondp2.png', 'images/secondp3.png',
    'images/secondp9.png', 'images/secondp4.png', 'images/secondp6.png', 'images/secondpsix.png', 'images/secondp5.png', 'images/secondp11.png','images/secondp10.png'
];

let isSeeking = false;

function togglePlay() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playIcon.className = 'fa-solid fa-pause'; 
    } else {
        audioPlayer.pause();
        playIcon.className = 'fa-solid fa-play'; 
    }
}

function backward() {
    currentSongIndex = (currentSongIndex - 1 + artistNames.length) % artistNames.length;
    loadSong(currentSongIndex);
}

function forward() {
    currentSongIndex = (currentSongIndex + 1) % artistNames.length;
    loadSong(currentSongIndex);
}

function loadSong(index) {
    artistName.textContent = artistNames[index];
    titleElement.textContent = songTitles[index];
    artistImage.src = artistImageSources[index];
    audioPlayer.src = songSources[index];
    audioPlayer.play();
    playIcon.className = 'fa-solid fa-pause'; // Update play icon class
    progressBar.value = 0; // Reset progress bar to beginning
}

function updateTime() {
    if (!isSeeking) {
        const currentMinutes = Math.floor(audioPlayer.currentTime / 60);
        const currentSeconds = Math.floor(audioPlayer.currentTime % 60);
        const totalMinutes = Math.floor(audioPlayer.duration / 60);
        const totalSeconds = Math.floor(audioPlayer.duration % 60);
        currentTimeElement.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`;
        totalTimeElement.textContent = `${totalMinutes}:${totalSeconds}`;
        progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    }
}

function seek(event) {
    isSeeking = true;
    const width = progressBar.clientWidth;
    const clickX = event.clientX - progressBar.getBoundingClientRect().left;
    const duration = (clickX / width) * audioPlayer.duration;
    audioPlayer.currentTime = duration;
}

audioPlayer.addEventListener('timeupdate', updateTime);
audioPlayer.addEventListener('ended', forward);

progressBar.addEventListener('input', function() {
    const seekTime = audioPlayer.duration * (progressBar.value / 100);
    audioPlayer.currentTime = seekTime;
});

progressBar.addEventListener('mouseup', function() {
    isSeeking = false;
});

loadSong(currentSongIndex);