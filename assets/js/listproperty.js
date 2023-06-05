// Upload Image

const chooseFileBtn = document.querySelector("#userUploadedImg");
var uploadedImg = " ";

chooseFileBtn.addEventListener("change", function () {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    uploadedImg = reader.result;
    document.querySelector(
      "#displayUploadedImg"
    ).style.backgroundImage = `url(${uploadedImg})`;
  });
  reader.readAsDataURL(this.files[0]);
});

