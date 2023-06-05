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
      title: 'Input email address',
      input: 'email',
      inputLabel: 'Your email address',
      inputPlaceholder: 'Enter your email address'
    })
    
    if (email) {
      Swal.fire(`Subscribed with: ${email}`)
    }
    addElementInFirebase("newsletter", {
      email: email
    })
    })()
})
