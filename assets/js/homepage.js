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

// Image slider

