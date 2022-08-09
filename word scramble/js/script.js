const scrambledWord = document.querySelector(".content .word"),
  hint = document.querySelector(".details .hint span"),
  timeText = document.querySelector(".details .time b"),
  refreshBtn = document.querySelector(".buttons .refresh-word"),
  checkBtn = document.querySelector(".buttons .check-word"),
  inputWord = document.querySelector(".content input");

let correctWord, timer;

const gameTimer = (maxTime) => {
  clearInterval(timer); //clear the timer before starting a new one
  timer = setInterval(() => {
    if (maxTime > 0) {
      maxTime--;
      return (timeText.innerText = maxTime);
    }
    clearInterval(timer);
    alert(`Oops! TIME OUT  ${correctWord.toUpperCase()} was the correct word.`);
    scrambleGame(); //game restarts after time out
  }, 1000);
};

const scrambleGame = () => {
  gameTimer(30); // 30 seconds timer starts
  let randomObj = words[Math.floor(Math.random() * words.length)];

  let wordArray = randomObj.word.split("");

  for (let i = wordArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); //generating random number
    //shuffling and swaping wordarray elements
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }

  scrambledWord.innerText = wordArray.join(""); //join the shuffled word array to display the shuffled word
  hint.innerText = randomObj.hint; //display the hint of the word
  correctWord = randomObj.word.toLowerCase(); //store the correct word in a variable
  inputWord.value = ""; // clear the input word after correct word is entered
  inputWord.focus(); //focus on the input word after correct word is entered
  inputWord.setAttribute("maxlength", correctWord.length); //set the maxlength of the input word to the length of the correct word
  //   console.log(randomObj, "wordArray:", wordArray);
};

scrambleGame();

refreshBtn.addEventListener("click", scrambleGame);

checkBtn.addEventListener("click", () => {
  let word = inputWord.value.toLowerCase();

  if (!word) return alert("Please enter a word"); //check if the user entered a word

  if (word != correctWord)
    return alert(`Wrong!  ${word} is not the correct word.`); //check if the user entered the correct word
  alert(`Congrats!  ${word.toUpperCase()} is the correct word.`);

  scrambleGame(); // refresh teh words after correct word is entered
});
