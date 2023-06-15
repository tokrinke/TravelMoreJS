// Newsletter
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
    const hotelId = snapshot.key;

    listingsSection.innerHTML += `
      <div class="aListing">
        <div class="hotelImg">
          <h3 class="bookNowBtn flexCenter cursorHover">
            <a class="flexCenter cursorHover" href="./booking.html?hotelId=${hotelId}">Book now</a>
          </h3>
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




















// Add listing to the homepage
// const listingsSection = document.querySelector("#listingsSection");

// firebase
//   .database()
//   .ref("listings")
//   .on("child_added", (snapshot) => {
//     const response = snapshot.val();
//     const hotelId = snapshot.key;
//     listingsSection.innerHTML += `
//           <div class="aListing">
//             <div class="hotelImg">
//                   <h3 class="bookNowBtn flexCenter cursorHover"><a class="flexCenter cursorHover" href="./booking.html" data-hotel-id="${snapshot.key}">Book now</a></h3>
//                   <img id="uploadedImg" class="uploadedListingImg cursorHover" src="${response.FormUploadedImage}" alt="hotelImage">
//               </div>
//               <div class="otherDetails cursorHover">
//                   <div class="hotelDetailsHeader">
//                       <div class="hotelDetailsHeaderLeft">
//                           <h2>${response.FormHotelName}</h2>
//                           <div>
//                               <span><i class="fa-solid fa-location-dot fa-lg" style="color: #004021;"></i> ${response.FormHotelLocation},</span>
//                               <span>${response.FormHotelAddress}</span>
//                           </div>
//                       </div>
//                       <div class="hotelDetailsHeaderRight flexCenter">
//                           <i class="fa-solid fa-book-bookmark fa-2xl" style="color: #004021;"></i>
//                       </div>
//                   </div>
//                   <div class="hotelDetailsBottom">
//                       <div class="hotelDetailsBottomLeft">
//                           <span><i class="fa-solid fa-user fa-sm" style="color: #FFF;"></i> ${response.FormContactName}</span>
//                           <div>
//                               <span><i class="fa-solid fa-envelope fa-sm" style="color: #ffffff;"></i>   ${response.FormContactEmail}</span>
//                               <span><i class="fa-solid fa-phone fa-sm" style="color: #ffffff;"></i>   ${response.FormContactNumber}</span>
//                           </div>
//                       </div>
//                       <div class="hotelDetailsBottomRight">
//                           <div class="displayStartingPrice flexCenter">
//                               Starting from: ${response.FormOneNightPrice} &#8382;
//                           </div>
//                       </div>
//                   </div>
//               </div>
//           </div>
//     `;
//   });

// Book hotel

// const bookNowBtn = document.querySelector('.bookNowBtn');

// bookNowBtn.addEventListener("click", ()=>{

// })






// Search hotels
const listingsRef = firebase.database().ref("listings");
const searchBar = document.querySelector(".inputSearch");
const searchBtn = document.querySelector("#searchBtn");

searchBar.addEventListener("keydown", (pressed) => {
  if (pressed.key === "Enter") {
    searchHotel();
  }
});

function searchHotel() {
  const searchValue = searchBar.value.toLowerCase();
  listingsSection.innerHTML = "";

  firebase
    .database()
    .ref("listings")
    .orderByChild("FormHotelName")
    .on("child_added", (snapshot) => {
      const response = snapshot.val();
      const hotelName = response.FormHotelName.toLowerCase();
      if (hotelName.includes(searchValue)) {
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
      }
    });

  setTimeout(() => {
    if (listingsSection.innerHTML === "") {
      displayAlert("Error", "Can't find hotels under that name", "error");
      setTimeout(() => {
        location.href = "/homepage.html";
      }, 1000);
    }
  }, 1000);
}


