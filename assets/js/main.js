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
