//load the country names

const fromText = document.querySelector(".from-text"),
  toText = document.querySelector(".to-text"),
  selectTag = document.querySelectorAll("select"),
  exchangeBtn = document.querySelector(".exchange"),
  translateBtn = document.querySelector(".container button"),
  icons = document.querySelectorAll(".row i");

selectTag.forEach((tag, id) => {
  //   console.log(tag.innerHTML);
  for (const countryCode in countries) {
    let selected;
    if (id == 0 && countryCode == "en-GB") {
      selected = "selected";
    } else if (id == 1 && countryCode == "hi-IN") {
      selected = "selected";
    }
    const option = `<option value="${countryCode}" ${selected}>${countries[countryCode]}</option>`;
    // tag.innerHTML += option;
    tag.insertAdjacentHTML("beforeend", option); //Before the end of the element (last child)
    // tag.insertAdjacentHTML("afterbegin", option); //After the beginning of the element (first child)
  }
});

translateBtn.addEventListener("click", () => {
  let text = fromText.value,
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;

  if (!text) {
    alert("kei ta lekh bey");
    return;
  } //if no text no conversion
  toText.setAttribute("placeholder", "translating.....");
  //   console.log(text, translateFrom, translateTo);

  let api = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
  fetch(api)
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data.responseData);
      toText.value = data.responseData.translatedText;
      toText.setAttribute("placeholder", "translation");
    });
});

exchangeBtn.addEventListener("click", () => {
  //exchanging textarea and select option
  let tempText = fromText.value;
  fromText.value = toText.value;
  toText.value = tempText;

  let tempTag = selectTag[0].value;
  selectTag[0].value = selectTag[1].value;
  selectTag[1].value = tempTag;
});

icons.forEach((icon) => {
  icon.addEventListener("click", ({ target }) => {
    if (target.classList.contains("fa-copy")) {
      if (target.id == "from") {
        navigator.clipboard.writeText(fromText.value); // writeText() is a method of the Clipboard API that copies text to the clipboard.
      } else {
        navigator.clipboard.writeText(toText.value);
      }
    } else {
      let utterance;
      //if clicked icon has 'from' id, speak the text from left side (from) else from right textarea
      if (target.id == "from") {
        utterance = new SpeechSynthesisUtterance(fromText.value);
        utterance.lang = selectTag[0].value; //setting utterance language to fromSelect tag value
      } else {
        utterance = new SpeechSynthesisUtterance(toText.value);
        utterance.lang = selectTag[1].value; //setting utterance language to toSelect tag value
      }
      speechSynthesis.speak(utterance); //speaks the passed utterance(text)
    }
  });
});
