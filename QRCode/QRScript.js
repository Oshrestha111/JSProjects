///------------GENERATOR--------------/

const left = document.querySelector(".left"),
  wrapper1 = left.querySelector(".wrapper1"),
  qrInput = wrapper1.querySelector(".form input"),
  generateBtn = wrapper1.querySelector(".form button"),
  qrImg1 = wrapper1.querySelector(".qr-code img");

generateBtn.addEventListener("click", () => {
  let qrValue = qrInput.value;

  if (!qrValue) return; //if no value entered returns

  generateBtn.innerText = "Generating QRCode..."; //while the qr image is being fetched

  //gets qr img from https://goqr.me/api/ this server and stores its src in img tag
  qrImg1.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrValue}`;

  //image appears only after it is fully loaded or fetched from the server
  qrImg1.addEventListener("load", () => {
    wrapper1.classList.add("active");
    generateBtn.innerText = "Generate QR Code";
  });
});

//removing qr image if the input field is empty or erased
qrInput.addEventListener("keyup", () => {
  if (!qrInput.value) {
    wrapper1.classList.remove("active");
  }
});

///------------SCANNER--------------/

const right = document.querySelector(".right"),
  wrapper2 = right.querySelector(".wrapper2"),
  form = wrapper2.querySelector("form"),
  fileInput = form.querySelector(" input"),
  infoText = form.querySelector("p"),
  qrImg = wrapper2.querySelector("form img"),
  details = wrapper2.querySelector(".details "),
  qrText = wrapper2.querySelector(".details textarea"),
  closeBtn = wrapper2.querySelector(".close "),
  copyBtn = wrapper2.querySelector(".copy ");

const fetchRequest = (formData, file) => {
  infoText.innerText = "Scanning QR Code....";
  //   console.log("form:", formData);
  fetch("http://api.qrserver.com/v1/read-qr-code/", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((result) => {
      result = result[0].symbol[0].data;
      console.log(result);
      infoText.innerText = result
        ? "Upload QR Code to Scan"
        : "Couldn't scan QR Code";
      if (!result) return;
      qrText.innerText = result;

      qrImg.src = URL.createObjectURL(file); //creates string containing a URL of passed obj & passing it as img Src
      //   console.log(URL.createObjectURL(file));

      wrapper2.classList.add("active");
    })
    .catch(() => {
      infoText.innerText = "Couldn't scan QR Code";
    });

  //   details.setAttribute("style", "opacity:1");
};

fileInput.addEventListener("change", (e) => {
  let file = e.target.files[0]; //taking the uploaded image data
  //   console.log(file);
  if (!file) return;
  let formData = new FormData(); //creating new object
  formData.append("file", file); //adding selected file to formData
  //   console.log("formdata:", formData);
  fetchRequest(formData, file);
});

copyBtn.addEventListener("click", () => {
  let text = qrText.textContent; //getting the texts from textarea
  console.log(text);
  navigator.clipboard.writeText(text); //copies text to the clipboard
});

form.addEventListener("click", () => {
  fileInput.click(); //form ma click garda file click hunxa
});

closeBtn.addEventListener("click", () => {
  wrapper2.classList.remove("active");
});
