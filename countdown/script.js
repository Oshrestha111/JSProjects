const futureDate = "Jan 01 2023";

let days = document.getElementById("days");
let hours = document.getElementById("hours");
let minutes = document.getElementById("min");
let seconds = document.getElementById("sec");

function countDown() {
	let currentDate = new Date();
	let newDate = new Date(futureDate);
	let timeDiff = (newDate - currentDate) / 1000;

	let day = Math.floor(timeDiff / (60 * 60 * 24));
	let hour = Math.floor(timeDiff / (60 * 60)) % 24;
	let min = Math.floor(timeDiff / 60) % 60;
	let sec = Math.floor(timeDiff) % 60;

	days.innerHTML = day;
	hours.innerHTML = hour;
	minutes.innerHTML = min;
	seconds.innerHTML = sec;
}
setInterval(countDown, 1000);
