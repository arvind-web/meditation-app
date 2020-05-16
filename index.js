const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");

  //selecting all sounds
  const sounds = document.querySelectorAll(".sound-picker button");

  //time display
  const timeDisplay = document.querySelector(".time-display");
  const timeSelect = document.querySelectorAll(".time-select button");

  //get the length of the outline
  const outlineLength = outline.getTotalLength();

  //duration
  let songDuration = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  //pick different sounds
  sounds.forEach((sound) => {
    sound.addEventListener("click", function () {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checkPlaying(song);
    });
  });

  //play sound
  play.addEventListener("click", () => {
    checkPlaying(song);
  });

  //select time duration
  timeSelect.forEach((option) => {
    option.addEventListener("click", function () {
      songDuration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(songDuration / 60)}:${Math.floor(
        songDuration % 60
      )}`;
    });
  });

  //function specifically to play and pause sound
  const checkPlaying = (song) => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "./svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "./svg/play.svg";
    }
  };

  //animating the circle
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsedTime = songDuration - currentTime;
    let second = Math.floor(elapsedTime % 60);
    let minutes = Math.floor(elapsedTime / 60);

    //animate here
    let progress = outlineLength - (currentTime / songDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    //animate the time display
    timeDisplay.textContent = `${minutes}:${second}`;

    if (currentTime >= songDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = "./svg/pause.svg";
      video.pause();
    }
  };
};

app();
