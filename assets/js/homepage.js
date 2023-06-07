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
const listings = getArrayFromFirebase("listings");
const listingsSection = document.querySelector("#listingsSection");

listings.forEach((listing) => {
  listingsSection.innerHTML += `
        <div class="aListing">
              <div class="hotelImg">
                <img id="uploadedImg" class="uploadedListingImg cursorHover" src="${listing.data.FormUploadedImage}" alt="hotelImage">
              </div>
              <div class="otherDetails cursorHover">
                  <div class="odTop">
                      <h2>${listing.data.FormHotelName}</h3>
                      <h4>${listing.data.FormHotelLocation}</h4>
                  </div>
                  <div class="odBottom">
                      <div class="odBotLeft">
                          <h4>${listing.data.FormHotelAddress}</h4>
                      <div class="contactInListing">
                          <h5>${listing.data.FormContactName}</h5>
                          <h5>${listing.data.FormContactEmail}</h5>
                          <h5>${listing.data.FormContactNumber}</h5>
                          </div>
                      </div>
                  <div class="displayStartingPrice flexCenter cursorHover">
                      <h4>Starting from: ${listing.data.FormOneNightPrice}</h4>
                  </div>
              </div>
          </div>
        </div>
    `;
});
