const admin = "022ef8a2-cc8b-438f-8093-5d92cff2f2bf";
const path = location.href.split("/").pop().split(".")[0];
console.log(path);

if (path === "landing") {
  const activeUser = sessionStorage.getItem("activeUserInfo");
  const userToken = sessionStorage.getItem("userToken");
  if (activeUser || userToken) {
    location.href = "homepage.html";
  }
} else {
  const activeUser = sessionStorage.getItem("activeUserInfo");
  const userToken = sessionStorage.getItem("userToken");
  if (path === "listproperty") {
    if (activeUser || userToken) {
    } else {
      location.href = "landing.html";
    }
  }
}
const activeUser = sessionStorage.getItem("activeUserInfo");
const userToken = sessionStorage.getItem("userToken");
if (path === "settings") {
  if (activeUser || userToken) {
  } else {
    location.href = "landing.html";
  }
}

function logOut() {
  sessionStorage.removeItem("activeUserInfo");
  sessionStorage.removeItem("userToken");
  location.href = "./landing.html";
}

function displayAlert(title, text, icon) {
  Swal.fire({ title, text, icon });
}

// Log out

const userIcon = document.querySelector("#userIcon");
const logOutBtn = document.querySelector(".logOutBtn");
const dataDropdownButton = document.querySelector("#dataDropdownButton");

dataDropdownButton.addEventListener("click", x => {
  if (!dataDropdownButton && x.target.closest("#dataDropdown") != null) return;

  let dropdown;
  if (dataDropdownButton) {
    dropdown = x.target.closest("#dataDropdown");
    dropdown.classList.toggle("active");
  }

  document.querySelectorAll("#dataDropdown.active").forEach((otherDropdown) => {
    if (otherDropdown === dropdown) return;
    dropdown.classList.remove("active");
  });
});
