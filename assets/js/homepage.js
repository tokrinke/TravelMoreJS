// log out
const userIcon = document.querySelector("#userIcon");
const userIconMenu = document.querySelector(".userIconMenu");
const logOutBtn = document.querySelector(".logOutBtn");

userIcon.addEventListener("click", () => {
  if (isMenuVisible) {
    userIconMenu.style.display = "none";
  } else {
    userIconMenu.style.display = "flex";
  }
  isMenuVisible = !isMenuVisible;
});
let isMenuVisible = false;

// newsletter
const subBtn = document.querySelector(".subBtn");

subBtn.addEventListener("click", () => {
  (async () => {
    const { value: email } = await Swal.fire({
      title: "Input email address",
      input: "email",
      inputLabel: "Your email address",
      inputPlaceholder: "Enter your email address",
    });

    if (email) {
      Swal.fire(`Subscribed with: ${email}`);
    }
    addElementInFirebase("newsletter", {
      email: email,
    });
  })();
});

// Add listing to the homepage
const listingsSection = document.querySelector("#listingsSection");

firebase
  .database()
  .ref("listings")
  .on("child_added", (snapshot) => {
    const response = snapshot.val();
    listingsSection.innerHTML += `
          <div class="aListing">
            <div class="hotelImg">
                  <img id="uploadedImg" class="uploadedListingImg cursorHover" src="${response.FormUploadedImage}" alt="hotelImage">
              </div>
              <div class="otherDetails cursorHover">
                  <div class="hotelDetailsHeader">
                      <div class="hotelDetailsHeaderLeft">
                          <h2>${response.FormHotelName}</h2>
                          <div>
                              <span><i class="fa-solid fa-location-dot fa-lg" style="color: #004021;"></i> ${response.FormHotelLocation},</span>
                              <span>${response.FormHotelAddress}</span>
                          </div>
                      </div>
                      <div class="hotelDetailsHeaderRight flexCenter">
                          <i class="fa-solid fa-book-bookmark fa-2xl" style="color: #004021;"></i>
                      </div>
                  </div>
                  <div class="hotelDetailsBottom">
                      <div class="hotelDetailsBottomLeft">
                          <span><i class="fa-solid fa-user fa-sm" style="color: #FFF;"></i> ${response.FormContactName}</span>
                          <div>
                              <span><i class="fa-solid fa-envelope fa-sm" style="color: #ffffff;"></i>   ${response.FormContactEmail}</span>
                              <span><i class="fa-solid fa-phone fa-sm" style="color: #ffffff;"></i>   ${response.FormContactNumber}</span>
                          </div>
                      </div>
                      <div class="hotelDetailsBottomRight">
                          <div class="displayStartingPrice flexCenter">
                              Starting from: ${response.FormOneNightPrice} &#8382;
                          </div>
                      </div>
                  </div>
              </div>
          </div>
    `;
  });


  // `
  //       <div class="aListing">
  //             <div class="hotelImg">
  //               <img id="uploadedImg" class="uploadedListingImg cursorHover" src="${response.FormUploadedImage}" alt="hotelImage">
  //             </div>
  //             <div class="otherDetails cursorHover">
  //                 <div class="odTop">
  //                     <h2>${response.FormHotelName}</h3>
  //                     <h4>${response.FormHotelLocation}</h4>
  //                 </div>
  //                 <div class="odBottom">
  //                     <div class="odBotLeft">
  //                         <h4>${response.FormHotelAddress}</h4>
  //                     <div class="contactInListing">
  //                         <h5>${response.FormContactName}</h5>
  //                         <h5>${response.FormContactEmail}</h5>
  //                         <h5>${response.FormContactNumber}</h5>
  //                         </div>
  //                     </div>
  //                 <div class="displayStartingPrice flexCenter cursorHover">
  //                     <h4>Starting from: ${response.FormOneNightPrice}&#8382;</h4>
  //                 </div>
  //             </div>
  //         </div>
  //       </div>
  //   `;