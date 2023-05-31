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
const userName = document.querySelector('#name');
const userSurname = document.querySelector('#surname');
const userPassword = document.querySelector('#password');
const repeatPass = document.querySelector('#repeatpassword');
const userEmail = document.querySelector('#email');
const userNumber = document.querySelector('#number');