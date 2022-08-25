const wrapper = document.querySelector(".wrapper"),
  qrInput = wrapper.querySelector(".form input"),
  generateBtn = wrapper.querySelector(".form button"),
  qrImg = wrapper.querySelector(".qr-code img");

generateBtn.addEventListener("click", () => {
  let qrValue = qrInput.value;

  if (!qrValue) return; //if no value entered returns

  generateBtn.innerText = "Generating QRCode..."; //while the qr image is being fetched

  //gets qr img from https://goqr.me/api/ this server and stores its src in img tag
  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrValue}`;

  //image appears only after it is fully loaded or fetched from the server
  qrImg.addEventListener("load", () => {
    wrapper.classList.add("active");
    generateBtn.innerText = "Generate QR Code";
  });
});

//removing qr image if the input field is empty or erased
qrInput.addEventListener("keyup", () => {
  if (!qrInput.value) {
    wrapper.classList.remove("active");
  }
});
