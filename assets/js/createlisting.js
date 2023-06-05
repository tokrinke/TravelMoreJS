const hotelName = document.querySelector("#hotelName");
const hotelAddress = document.querySelector("#hotelAddress");
const startingPrice = document.querySelector("#startingPrice");
const uploadImage = document.querySelector("#uploadImage");
const hotelLocation = document.querySelectorAll("#enterLoc");
const contactName = document.querySelector("#contactName");
const contactEmail = document.querySelector("#contactEmail");
const contactNumber = document.querySelector("#contactNumber");
const uploadListingBtn = document.querySelector("#uploadListingBtn");
const listingsSection = document.querySelector("#listingsSection");
const img = document.querySelector(".uploadedImagePreview");
const placeholderImg =
  "https://peacemakersnetwork.org/wp-content/uploads/2019/09/placeholder.jpg";
const uploadedImagePreview = document.querySelector("uploadedImagePreview");

//     let uploadedImageUrl = "";

//   uploadImage.addEventListener("change", () => {
//     const reader = new FileReader();
//     reader.addEventListener("load", () => {
//         uploadedImageUrl = reader.result;
//         document.querySelector(".choosePhotos").style.backgroundImage = `url(${uploadedImageUrl})`;
//     })
//     reader.readAsDataURL(this.files[0]);
//   })

uploadImage.addEventListener("change", () => {
  const fileReader = new FileReader();

  if (uploadImage.files[0]) {
    fileReader.readAsDataURL(uploadImage.files[0]);
    fileReader.onload = () => {
      img.src = fileReader.result;
    };
  } else {
    img.src = placeholderImg;
  }
});

uploadListingBtn.addEventListener("click", () => {
  let FormHotelName = hotelName.value;
  let FormHotelLocation = hotelLocation.value;
  let FormStartingPrice = startingPrice.value;
  let FormHotelAddress = hotelAddress.value;
  let FormContactName = contactName.value;
  let FormContactEmail = contactEmail.value;
  let FormContactNumber = contactNumber.value;
  let FormUploadedImage = document.querySelector(".uploadPhotos").src;

  if (FormHotelName && FormHotelLocation && FormStartingPrice && FormHotelAddress && FormContactName && FormContactEmail && FormContactEmail && FormContactNumber && FormUploadedImage
  ) {
    setTimeout(() => {
      AddElementInFirebase("listings", {
        FormHotelName,
        FormHotelLocation,
        FormHotelAddress,
        FormContactName,
        FormContactEmail,
        FormContactNumber,
        FormUploadedImage,
        createdAt: new Date().toString(),
      });
      displayAlert("Success", "Your listing was added succesfully", "success");
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

//
// listingsSection.innerHTML += `
//               <div class="aListing">
//                   <div class="hotelImg">
//                       <img id="uploadedImg" class="uploadedListingImg cursorHover" src="placeholderImg" alt="hotelImage">
//                   </div>
//                   <div class="otherDetails cursorHover">
//                       <div class="odTop">
//                           <h2>${hotelName.value}</h3>
//                           <h4>${hotelLocation.value}</h4>
//                       </div>
//                       <div class="odBottom">
//                           <div class="odBotLeft">
//                               <h4>${hotelAddress.value}</h4>
//                           <div class="contactInListing">
//                               <h5>${contactName.value}</h5>
//                               <h5>${contactEmail.value}</h5>
//                               <h5>${contactNumber.value}</h5>
//                               </div>
//                           </div>
//                       <div class="displayStartingPrice flexCenter cursorHover">
//                           <h4>Starting from: ${startingPrice.value}</h4>
//                       </div>
//                   </div>
//               </div>
//           </div>
//       `;
