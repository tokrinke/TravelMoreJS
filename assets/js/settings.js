// choose what to edit
const editInfo = document.querySelector(".infoBtn");
const editListings = document.querySelector(".listingsBtn");
const yourInfo = document.querySelector(".yourInfo");
const yourListings = document.querySelector(".yourListings");

editInfo.addEventListener("click", function makeEditProfileVisible() {
  yourInfo.style.display = "flex";
  yourListings.style.display = "none";
  editInfo.style.borderBottom = "2px solid #004021";
  editListings.style.borderBottom = "none";
});

editListings.addEventListener("click", function makeEditListingsVisible() {
  yourListings.style.display = "flex";
  yourInfo.style.display = "none";
  editListings.style.borderBottom = "2px solid #004021";
  editInfo.style.borderBottom = "none";
});

//Edit info
const userName = document.querySelector("#name");
const userSurname = document.querySelector("#surname");
const userPassword = document.querySelector("#password");
const repeatPass = document.querySelector("#repeatpassword");
const userEmail = document.querySelector("#email");
const userNumber = document.querySelector("#number");
const displaysProfilePic = document.querySelector("#displaysProfilePic");
const placeholderPfp = "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
const pfp = document.querySelector(".profilePic");
const uploadPfpBtn = document.querySelector("#uploadPfpBtn");

// Upload pfp
uploadPfpBtn.addEventListener("change", () => {
  const fileReader = new FileReader();

  if (uploadPfpBtn.files[0]) {
    fileReader.readAsDataURL(uploadPfpBtn.files[0]);
    fileReader.onload = () => {
      pfp.src = fileReader.result;
    };
  } else {
    pfp.src = placeholderPfp;
  }
});

// save changes
function clearSettingsInputs() {
  userName.value = "";
  userSurname.value = "";
  userPassword.value = "";
  repeatPass.value = "";
  userEmail.value = "";
  userNumber.value   = "";
}
const saveChangesBtn = document.querySelector("#saveChangesBtn");

saveChangesBtn.addEventListener("click", () => {
  let uploadedPfp = document.querySelector(".profilePic").src;
  if(userName.value && userSurname.value && userPassword.value && userNumber.value && userEmail.value && pfp ){
    if (userPassword.value == repeatPass.value) {
      updateElementInFirebase("user", `${userToken}`, {
        name: userName.value,
        surname: userSurname.value,
        password: userPassword.value,
        email: userEmail.value,
        number: userNumber.value,
        pfp: uploadedPfp,
      });
      clearSettingsInputs();
      displayAlert("Success", "Details updated successfully", "success");
    } else {
      displayAlert(
        "Error",
        "Make sure that the new password and the repeated password match",
        "error"
      );
    }
  } else {
    displayAlert("Error", "Please fill in all fields", "error");
  }
});
// remove listing
const removeListingBtn = document.querySelector(".removeListingBtn");
const userId = sessionStorage.getItem("userToken");
const displayUsersListings = document.querySelector(".listingTemplate");
const listingsRef = firebase.database().ref("listings");

document.addEventListener("DOMContentLoaded", () => {
  listingsRef.on("child_added", (snapshot) => {
    const listingData = snapshot.val();
    console.log(listingsRef);
    if (
      listingData.uploadedBy === userId ||
      userId === "022ef8a2-cc8b-438f-8093-5d92cff2f2bf"
    ) {
      displayUsersListings.innerHTML += `
        <div class="listingTemplateDiv">
          <div class="listingTemplateImage">
            <img id="listingImg" class="uploadedListingImgSettings cursorHover" src="${listingData.FormUploadedImage}" alt="listingImage">
          </div>
          <div class="listingTemplateInfo">
            <h3>${listingData.FormHotelName}</h3>
            <span>${listingData.FormHotelLocation}, ${listingData.FormHotelAddress}</span>
          </div>
          <div class="removeListing flexCenter cursorHover">
            <button class="removeListingBtn cursorHover" onclick="removeAListing('${snapshot.key}')"><i class="fa-solid fa-trash fa-2xl" style="color: #ffffff;"></i></button>
          </div>
        </div>
      `;
    }
  });
});

function removeAListing(id) {
  setTimeout(() => {
    removeElementFromFirebase("listings", id);
    displayAlert("Success", "Listing removed successfully", "success");
    location.href = "/settings.html";
  }, 2000);
}

//reflect active user name and surname
const userFullnameDisplay = document.querySelector("#userFullname");
const activeUserName = sessionStorage.getItem("activeUserInfo");
const parsedUserName = JSON.parse(activeUserName);
const justName = parsedUserName.name;
const justSurame = parsedUserName.surname;

userFullnameDisplay.innerHTML = `Hello, ${justName}` + " " + `${justSurame}`;

// active user pfp
const UserToken = sessionStorage.getItem("userToken");
const activeUserInRef = firebase.database().ref(`user/${UserToken}`);

pfp.src = placeholderPfp;


//reflect active user reg date
const userCreatedAt = document.querySelector("#userRegDate");

activeUserInRef.on("value", (snapshot) => {
  const userData = snapshot.val();
  if (userData) {
    const userCreatedAtDate = userData.createdAt;
    userCreatedAt.innerHTML = `Member Since: ${userCreatedAtDate.split(" ").splice(0, 5).join(" ")}`;
  }
});

// activeUserInRef.on("value", (snapshot) => {
//   const userData = snapshot.val();
//   if (userData) {
//     const userCreatedAtDate = userData.createdAt;
//     userCreatedAt.innerHTML = `Member Since: ${userCreatedAtDate.split(" ").splice(0, 5).join(" "))}`
//   }
// });