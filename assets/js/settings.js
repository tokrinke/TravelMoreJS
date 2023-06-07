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
const placeholderPfp =
  "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";
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
  userName = "";
  userSurname = "";
  userPassword = "";
  repeatPass = "";
  userEmail = "";
  userNumber = "";
}
const saveChangesBtn = document.querySelector("#saveChangesBtn");

saveChangesBtn.addEventListener("click", () => {
  let uploadedPfp = document.querySelector(".profilePic").src;
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
});
// remove listing

// reflect active user
// const userFullnameDisplay = document.querySelector("#userFullname");
// const userCreatedAt = document.querySelector("#userRegDate");
// let activeUserDetails = getElementFromFirebase("user", `${userToken}`);
// const updatedFirebaseDataBase = getArrayFromFirebase("user");
// updatedFirebaseDataBase.forEach((user) => {
//   if (user.data.userToken === userToken) {
//     activeUserDetails = user;
//     return;
//   }
// });
// console.log(activeUserDetails);

// if(userToken && activeUser){
//   userFullnameDisplay.innerHTML = JSON.stringify({
//     name: activeUserDetails.data.name,
//     surname: activeUserDetails.data.surname
//   })
//   // userFullnameDisplay.innerHTML = `Hello, ${activeUserDetails.data.name + " " + activeUserDetails.data.surname}`;
// }

// if(userToken && activeUser){

//   // userCreatedAt.innerHTML = `Member since: ${(activeUser).createdAt}`;
// }
