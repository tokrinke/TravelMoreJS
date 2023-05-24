// ChatBoxHover
const chatIcon = document.querySelector(".chat");
const chatInfo = document.querySelector(".chatInfo");

chatIcon.addEventListener("mouseover", function chatHover() {
  chatInfo.style.display = "block";
});
chatIcon.addEventListener("mouseout", function chatHoverEnd() {
  chatInfo.style.display = "none";
});

// Chat
