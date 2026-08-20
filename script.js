const songs = [
    {
        title: "Lost In The Moment",
        artist: "Luna Waves",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=500&q=80",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        title: "Ocean Drive",
        artist: "Miami Nights",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        title: "Sunset Lover",
        artist: "Petit Biscuit",
        image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=500&q=80",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    {
        title: "Golden Hour",
        artist: "JVKE",
        image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=500&q=80",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    }
];

let currentSong = 0;

const audio = document.getElementById("audio");
const playButton = document.getElementById("play");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const title = document.getElementById("songTitle");
const artist = document.getElementById("artistName");
const image = document.getElementById("mainImage");
const songList = document.getElementById("songList");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");
const search = document.getElementById("search");

function showSong(index) {
    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;
    image.src = songs[index].image;
    audio.src = songs[index].audio;
    progress.value = 0;

    showPlaylist();
}

function showPlaylist() {
    songList.innerHTML = "";

    songs.forEach(function(song, index) {
        const div = document.createElement("div");

        div.className = "song";

        if (index === currentSong) {
            div.classList.add("selected");
        }

        div.innerHTML = `
            <img src="${song.image}">
            <div class="song-info">
                <h4>${song.title}</h4>
                <p>${song.artist}</p>
            </div>
        `;

        div.addEventListener("click", function() {
            currentSong = index;
            showSong(currentSong);
            audio.play();
            playButton.textContent = "❚❚";
        });

        songList.appendChild(div);
    });
}

playButton.addEventListener("click", function() {
    if (audio.paused) {
        audio.play();
        playButton.textContent = "❚❚";
    } else {
        audio.pause();
        playButton.textContent = "▶";
    }
});

nextButton.addEventListener("click", function() {
    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    showSong(currentSong);
    audio.play();
    playButton.textContent = "❚❚";
});

previousButton.addEventListener("click", function() {
    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    showSong(currentSong);
    audio.play();
    playButton.textContent = "❚❚";
});

audio.addEventListener("timeupdate", function() {
    if (audio.duration) {
        progress.value = (audio.currentTime / audio.duration) * 100;
        currentTime.textContent = formatTime(audio.currentTime);
        duration.textContent = formatTime(audio.duration);
    }
});

progress.addEventListener("input", function() {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", function() {
    audio.volume = volume.value;
});

audio.addEventListener("ended", function() {
    nextButton.click();
});

search.addEventListener("input", function() {
    const value = search.value.toLowerCase();

    const allSongs = document.querySelectorAll(".song");

    songs.forEach(function(song, index) {
        const name = song.title.toLowerCase();
        const artistName = song.artist.toLowerCase();

        if (name.includes(value) || artistName.includes(value)) {
            allSongs[index].style.display = "flex";
        } else {
            allSongs[index].style.display = "none";
        }
    });
});

function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    return minutes + ":" + seconds;
}

audio.volume = 0.7;

showSong(currentSong);