(function () {
  let screen = document.querySelector(".screen");
  let buttons = document.querySelectorAll(".btn");
  let equal = document.querySelector(".btn-equal");
  let clear = document.querySelector(".btn-clear");
  let erase = document.querySelector(".btn-erase");

  buttons.forEach(function (button) {
    if (button.id != "equal" && button.id != "erase") {
      button.addEventListener("click", function (e) {
        let value = e.target.dataset.num;
        screen.value += value;
      });
    }
  });

  equal.addEventListener("click", function (e) {
    if (screen.value === "") {
      screen.value = "";
      window.alert("kei number ta haal muji");
    } else {
      let result = eval(screen.value);
      screen.value = result;
    }
  });

  clear.addEventListener("click", function () {
    screen.value = "";
  });

  erase.addEventListener("click", function () {
    screen.value = screen.value.slice(0, -1);
  });
})();

// erase garni feature haal
// vayena
