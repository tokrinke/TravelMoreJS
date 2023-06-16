const hotelName = document.querySelector("#hotelName");
const hotelAddress = document.querySelector("#hotelAddress");
const oneNightPrice = document.querySelector("#oneNightPrice");
const oneWeekPrice = document.querySelector("#oneWeekPrice");
const oneMonthPrice = document.querySelector("#oneMonthPrice");
const uploadHotelImageBtn = document.querySelector("#uploadHotelImageBtn");
const hotelLocation = document.querySelector("#hotelLocation");
const contactName = document.querySelector("#contactName");
const contactEmail = document.querySelector("#contactEmail");
const contactNumber = document.querySelector("#contactNumber");
const hotelBio = document.querySelector("#hotelBio");
const createListingBtn = document.querySelector("#createListingBtn");
const img = document.querySelector("#displayHotelImage");
const placeholderImg =
  "https://peacemakersnetwork.org/wp-content/uploads/2019/09/placeholder.jpg";
const uploadedImagePreview = document.querySelector("#displayHotelImage");
let UploadedImage = document.querySelector("#displayHotelImage").src;

//upload img
uploadHotelImageBtn.addEventListener("change", () => {
  const fileReader = new FileReader();

  if (uploadHotelImageBtn.files[0]) {
    fileReader.readAsDataURL(uploadHotelImageBtn.files[0]);
    fileReader.onload = () => {
      img.src = fileReader.result;
    };
  } else {
    img.src = placeholderImg;
  }
});

//create listing
createListingBtn.addEventListener("click", () => {
  let FormHotelName = hotelName.value;
  let FormHotelLocation = hotelLocation.value;
  let FormOneNightPrice = oneNightPrice.value;
  let FormOneWeekPrice = oneWeekPrice.value;
  let FormOneMonthPrice = oneMonthPrice.value;
  let FormHotelAddress = hotelAddress.value;
  let FormContactName = contactName.value;
  let FormContactEmail = contactEmail.value;
  let FormContactNumber = contactNumber.value;
  let FormHotelBio = hotelBio.value;
  let FormUploadedImage = document.querySelector("#displayHotelImage").src;

  if (
    FormHotelName &&
    FormHotelLocation &&
    FormOneNightPrice &&
    FormOneWeekPrice &&
    FormOneMonthPrice &&
    FormHotelAddress &&
    FormContactName &&
    FormContactEmail &&
    FormContactNumber &&
    FormHotelBio &&
    FormUploadedImage 
  ) {
    createListingBtn.disabled = true;
    addElementInFirebase("listings", {
      FormHotelName,
      FormHotelLocation,  
      FormHotelAddress,
      FormOneNightPrice,
      FormOneWeekPrice,
      FormOneMonthPrice,
      FormContactName,
      FormContactEmail,
      FormContactNumber,
      FormHotelBio,
      FormUploadedImage,
      createdAt: new Date().toString(),
      uploadedBy: sessionStorage.getItem("userToken"),
    });
    displayAlert("Success", "Your listing was added succesfully", "success");
    setTimeout(() => {
      location.href = "./homepage.html";
    }, 2000);
  } else {
    displayAlert(
      "Error",
      "More information needed, fill the form fully",
      "error"
    );
  }
});

