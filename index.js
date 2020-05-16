const app = () => {
  const song = document.querySelector(".song");

  let songSrc = "./sounds/";

  //selecting change button
  const soundBtn = document.querySelectorAll(".sound-picker button");

  //time display
  const timeDisplay = document.querySelector(".time-display");
  const timeSelect = document.querySelectorAll(".time-select button");

  //duration
  let songDuration = 600;

  //pick different sounds
  soundBtn.forEach((sound) => {
    sound.addEventListener("click", function () {
      song.src =
        songSrc +
        this.getAttribute("data-sound") +
        Math.floor(Math.random() * 8 + 1) +
        ".mp3";
      checkPlaying(song, "play");
    });
  });

  //play sound
  playSound = (thisClick) => {
    checkPlaying(song, thisClick.id);
  };

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
  const checkPlaying = (song, playClass) => {
    if (playClass.toLowerCase() === "play") {
      song.play();
      document.querySelector("#play").style.display = "none";
      document.querySelector("#pause").style.display = "inline-block";
    } else {
      song.pause();
      document.querySelector("#play").style.display = "inline-block";
      document.querySelector("#pause").style.display = "none";
    }
  };

  //animating the circle
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsedTime = songDuration - currentTime;
    let second = Math.floor(elapsedTime % 60);
    let minutes = Math.floor(elapsedTime / 60);

    //animate here
    //let progress = outlineLength - (currentTime / songDuration) * outlineLength;
    //outline.style.strokeDashoffset = progress;

    //animate the time display
    timeDisplay.textContent = `${minutes}:${second}`;

    if (currentTime >= songDuration) {
      song.pause();
      song.currentTime = 0;
      document.querySelector("#play").style.display = "inline-block";
      document.querySelector("#pause").style.display = "none";
    }
  };
};

app();
