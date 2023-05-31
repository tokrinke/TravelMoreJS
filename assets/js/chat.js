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
const chatBtn = document.querySelector(".chat");
const chatBox = document.querySelector(".chatBox");
const sendMsgBtn = document.querySelector(".sendMsgBtn");
const inputMsg = document.querySelector("#txtMsg");
const aboveMsg = document.querySelector(".aboveMsg");


function openChat() {
  chatBox.style.display = "flex";
  if(chatBox.style.display = "flex"){
    chatIcon.style.display = "none";
  }
}

function closeChat() {
  chatBox.style.display = "none";
  if(chatBox.style.display = "none"){
    chatIcon.style.display = "flex";
  }
}

function sendMessage(){
  const message = inputMsg.value;
  if(message !==" " && activeUser !==" "){
    AddElementInFirebase("messages", {
      message: message,
      name: JSON.parse(activeUser),
      surname: JSON.parse(activeUser),
      createdAt: new Date().toString()
    } )
  }

}

inputMsg.addEventListener("keydown", (pressed) => {
  if(pressed.key === "Enter"){
    sendMessage();
  }
})