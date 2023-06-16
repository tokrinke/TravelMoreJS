const signUpBtn = document.querySelector("#signUpBtn");
const authMenu = document.querySelector(".authMenu");
const logInBar = document.querySelector(".logInBar");
const smallInputBox = document.querySelectorAll(".smallInput");
const bigInputBox = document.querySelectorAll(".bigInput");
const rightSideSec = document.querySelector(".secRightSide");
const logInOpt = document.querySelector(".userLogIn");
const logInOptMsg = document.querySelector(".userAccInfoBox");
const users = getArrayFromFirebase("user");

// SignUp/LogIn menu toggle
signUpBtn.addEventListener("click", function makeAuthMenuVisible() {
  authMenu.style.display = "block";
  logInBar.style.display = "none";
  clearInputs();
});

logInOpt.addEventListener("click", function makeLogInMenuVisible() {
  logInBar.style.display = "block";
  authMenu.style.display = "none";
  clearInputs();
});

// inputs/btns
const logInBtn = document.querySelector("#finishLogIn");
const createAccBtn = document.querySelector("#finishSignUp");
const inputName = document.querySelector(".inputName");
const inputSurname = document.querySelector(".inputSurname");
const inputEmail = document.querySelector(".inputRegEmail");
const inputLogEmail = document.querySelector(".inputEmail");
const inputPassword = document.querySelector(".inputRegPassword");
const inputLogPassword = document.querySelector(".inputPassword");
const repeatPassword = document.querySelector(".repeatRegPassword");

// Reg logic
createAccBtn.addEventListener("click", () => {
  let nameVal = inputName.value;
  let surnameVal = inputSurname.value;
  let emailVal = inputEmail.value;
  let passwordVal = inputPassword.value;
  let repeatedPasswordVal = repeatPassword.value;

  if (nameVal && surnameVal && emailVal && passwordVal && repeatedPasswordVal) {
    if(emailVal.includes("@gmail.com") || emailVal.includes("@yahoo.com") || emailVal.includes("@travelmore.com") || emailVal.includes("@mail.ru")){
          const currentUser = users.find((user) => user.data.email === emailVal);
        if (currentUser) {
          displayAlert(
            "Email taken",
            "Unfortunately the email you entered is taken, please choose another one",
            "error"
          );
        } else {
          createAccBtn.disabled = true;
          addElementInFirebase("user", {
            name: nameVal,
            surname: surnameVal,
            email: emailVal,
            password: passwordVal,
            createdAt: new Date().toString(),
          });
          displayAlert("User successfully registered", `${emailVal}`, "success");
          const updatedFirebaseDB = getArrayFromFirebase("user");
          setTimeout(() => {
            let activeUserData;
            updatedFirebaseDB.forEach((user) => {
              if (user.data.email === emailVal) {
                activeUserData = user;
                return;
              }
            });
            sessionStorage.setItem("userToken", activeUserData.userid);
            sessionStorage.setItem(
              "activeUserInfo",
              JSON.stringify({
                name: activeUserData.data.name,
                surname: activeUserData.data.surname
              })
            );
            location.href = "./homepage.html";
          }, 2000);
        }
      } else {
        displayAlert(
          "Error",
          "Make sure email you provided exists and ensure all required fields are filled in.",
          "error"
        );
      }
      if (repeatedPasswordVal !== passwordVal) {
        displayAlert(
          "Error",
          "Please make sure that repeated password matches the original",
          "error"
        );
      }
    }
});

// Login logic
logInBtn.addEventListener("click", () => {
  let emailVal = inputLogEmail.value;
  let passwordVal = inputLogPassword.value;
  const activeUserData = users.find(
    (user) => user.data.email === emailVal && user.data.password === passwordVal
  );
  if (activeUserData) {
    logInBtn.disabled = true;
    sessionStorage.setItem("userToken", activeUserData.userid);
    sessionStorage.setItem(
      "activeUserInfo",
      JSON.stringify({
        name: activeUserData.data.name,
        surname: activeUserData.data.surname,
      })
    );
    displayAlert("Logged in succesfully", `${emailVal}`, "success");
    setTimeout(() => {
      location.href = "./homepage.html";
    }, 2000);
  } else {
    displayAlert("Error", "Account doesn't exist", "error");
  }
});

// functions
function clearInputs() {
  inputName.value = "";
  inputSurname.value = "";
  inputEmail.value = "";
  inputPassword.value = "";
  repeatPassword.value = "";
}
