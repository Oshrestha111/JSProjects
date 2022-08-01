console.log("welcome spotifiers");

//initialaize variables
let songIndex = 0;
let audioElement = new Audio("./songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
	{
		songName: "ACHAL-000",
		filePath: "./songs/1.mp3",
		coverPath: "./covers/1.jpg",
	},
	{
		songName: "21 savage A lot",
		filePath: "./songs/21Savage A lot.mp3",
		coverPath: "./covers/2.jpg",
	},
	{
		songName: "Alie Gatie-Moonlight",
		filePath: "./songs/Ali Gatie-Moonlight.mp3",
		coverPath: "./covers/3.jpg",
	},
	{
		songName: "Broken Angel",
		filePath: "./songs/BrokenAngel.mp3",
		coverPath: "./covers/4.jpg",
	},
	{
		songName: "Hurts so Good",
		filePath: "./songs/Hurts so good.mp3",
		coverPath: "./covers/5.jpg",
	},
];

songItems.forEach((element, i) => {
	console.log(i);
	element.getElementsByTagName("img")[0].src = songs[i].coverPath;
	element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});
// audioElement.play();

//Handle play or pause click
masterPlay.addEventListener("click", () => {
	if (audioElement.paused || audioElement.currentTime <= 0) {
		audioElement.play();
		masterPlay.classList.remove("fa-play-circle");
		masterPlay.classList.add("fa-pause-circle");
		gif.style.opacity = 1;
	} else {
		audioElement.pause();
		masterPlay.classList.remove("fa-pause-circle");
		masterPlay.classList.add("fa-play-circle");
		gif.style.opacity = 0;
	}
});

//Listen to Events
audioElement.addEventListener("timeupdate", () => {
	//updating seekbar
	progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
	myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
	audioElement.currentTime =
		(myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
	Array.from(document.getElementsByClassName("songItemPlay")).forEach(
		(element) => {
			element.classList.remove("fa-pause-circle");
			element.classList.add("fa-play-circle");
		}
	);
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
	(element) => {
		element.addEventListener("click", (e) => {
			console.log(e.target);
			makeAllPlays();
			songIndex = parseInt(e.target.id);
			e.target.classList.remove("fa-play-circle");
			e.target.classList.add("fa-pause-circle");
			audioElement.src = songs[songIndex].songName;
			audioElement.currentTime = 0;
			audioElement.play();
			gif.style.opacity = 1;
			masterPlay.classList.remove("fa-play-circle");
			masterPlay.classList.add("fa-pause-circle");
		});
	}
);

document.getElementById("next").addEventListener("click", () => {
	if (songIndex >= 9) {
		songIndex = 0;
	} else {
		songIndex += 1;
	}
	audioElement.src = songs[songIndex].filePath;
	masterSongName.innerText = songs[songIndex].songName;
	audioElement.currentTime = 0;
	audioElement.play();
	gif.style.opacity = 1;
	masterPlay.classList.remove("fa-play-circle");
	masterPlay.classList.add("fa-pause-circle");
});

document.getElementById("previous").addEventListener("click", () => {
	if (songIndex <= 0) {
		songIndex = 0;
	} else {
		songIndex -= 1;
	}
	audioElement.src = songs[songIndex].filePath;
	masterSongName.innerText = songs[songIndex].songName;
	audioElement.currentTime = 0;
	audioElement.play();
	gif.style.opacity = 1;
	masterPlay.classList.remove("fa-play-circle");
	masterPlay.classList.add("fa-pause-circle");
});
