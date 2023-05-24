const signUpBtn = document.querySelector("#signUpBtn");
const authMenu = document.querySelector(".authMenu");
const logInBar = document.querySelector(".logInBar")
const smallInputBox = document.querySelectorAll(".smallInput");
const bigInputBox = document.querySelectorAll(".bigInput");
const rightSideSec = document.querySelector(".secRightSide");
const logInOpt = document.querySelector(".userLogIn");
const logInOptMsg = document.querySelector(".userAccInfoBox");
const users = getArrayFromFirebase("user");

// SignUp/LogIn 
signUpBtn.addEventListener("click", function makeAuthMenuVisible() {
  authMenu.style.display = "block";
  logInBar.style.display = "none";
});

logInOpt.addEventListener("click", function makeLogInMenuVisible() {
    logInBar.style.display = "block";
    authMenu.style.display = "none";
  });

// Image carousel

// let carouselIndex = 0;
// showCarouselImgs();

// function showCarouselImgs(){
//   let carousel = document.querySelectorAll(".carouselImgs");
//   for (let i = 0; i < carousel.length; i++){
//     carousel[i].style.display = "none";
//   }
//   carouselIndex++
//   if (carouselIndex > carousel.length) {carouselIndex = 1}
//   carousel[carouselIndex-1].style.display = "block";
//   setTimeout(showCarouselImgs, 4000);
// }

//Auth logic
const logInBtn = document.querySelector("#finishLogIn");
const createAccBtn = document.querySelector("#finishSignUp");
const inputName = document.querySelector(".inputName");
const inputSurname = document.querySelector(".inputSurname");
const inputEmail = document.querySelector(".inputRegEmail");
const inputLogEmail = document.querySelector(".inputEmail")
const inputPassword = document.querySelector(".inputRegPassword");
const inputLogPassword = document.querySelector(".inputPassword");
const repeatPassword = document.querySelector(".repeatRegPassword");

// Reg logic
createAccBtn.addEventListener("click", () =>  {
  let nameVal = inputName.value;
  let surnameVal = inputSurname.value;
  let emailVal = inputEmail.value;
  let passwordVal = inputPassword.value;
  let repeatedPasswordVal = repeatPassword.value;

    if(nameVal && surnameVal && emailVal && passwordVal && repeatedPasswordVal) {
      const currentUser = users.find(user => user.data.email === emailVal);
      if(currentUser){
        displayAlert("Email taken", "Unfortunately the email you entered is taken, please choose another one", "error")
      } else {
        createAccBtn.disabled = true;
        AddElementInFirebase("user", {
          name: nameVal,
          surname: surnameVal,
          email: emailVal,
          password: passwordVal
        });
        displayAlert("User successfully registered", `${emailVal}`, "success");
        const updatedFirebaseDB = getArrayFromFirebase("user");
        setTimeout(() => {
          let activeUser;
          updatedFirebaseDB.forEach(user => {
            if(user.data.email === emailVal){
              activeUser = user;
              return;
            }
          });
          sessionStorage.setItem("userToken", activeUser.id);
          sessionStorage.setItem("activeUserInfo", JSON.stringify({
            fullname: activeUser.data.name + activeUser.data.surname,
          }));
          location.href = "./homepage.html";
        }, 2000)
      }
    } else {
      displayAlert("Error", "Please provide all of the required information", "error");
    } if( repeatedPasswordVal !== passwordVal){
      displayAlert("Error", "Please make sure that repeated password matches the original", "error");
    }
  }
);

// Login logic
logInBtn.addEventListener("click",() => {
  let emailVal = inputLogEmail.value;
  let passwordVal = inputLogPassword.value;
    const activeUser = users.find(user => user.data.email === emailVal && user.data.password === passwordVal);
    if(activeUser){
      logInBtn.disabled = true;
      sessionStorage.setItem("userToken", activeUser.id);
          sessionStorage.setItem("activeUserInfo", JSON.stringify({
            fullname: activeUser.data.name + " " + activeUser.data.surname,
          }));
      setTimeout(() => {
        location.href = "./homepage.html"
      }, 2000)
    } else {
      displayAlert("Error", "Account doesn't exist", "error")
    }
})