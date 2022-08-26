const wrapper = document.querySelector(".wrapper"),
  form = wrapper.querySelector("form"),
  fileInput = form.querySelector(" input"),
  infoText = form.querySelector("p"),
  qrImg = wrapper.querySelector("form img"),
  details = wrapper.querySelector(".details "),
  qrText = wrapper.querySelector(".details textarea"),
  closeBtn = wrapper.querySelector(".close "),
  copyBtn = wrapper.querySelector(".copy ");

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

      wrapper.classList.add("active");
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
  wrapper.classList.remove("active");
});
