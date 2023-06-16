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
const displayMsgs = document.querySelector("#displayMsgs");
const msgArr = [];

function openChat() {
  chatBox.style.display = "flex";
  if ((chatBox.style.display = "flex")) {
    chatIcon.style.display = "none";
  }
}

function closeChat() {
  chatBox.style.display = "none";
  if ((chatBox.style.display = "none")) {
    chatIcon.style.display = "flex";
  }
}

function clearChat() {
  removeRefFromFirebase("messages");
  location.href = "/homepage.html";
}

function clearMsgInputBar() {
  inputMsg.value = "";
}

inputMsg.addEventListener("keydown", (pressed) => {
  if (pressed.key === "Enter") {
    sendMessage();
  }
});

sendMsgBtn.addEventListener("click", () => {
  sendMessage();
});

function sendMessage() {
  const message = inputMsg.value;
  if (activeUser !== " " && userToken !== " " && message !== "") {
    addElementInFirebase("messages", {
      authorID: userToken,
      message: message,
      fullname:
        JSON.parse(activeUser).name + " " + JSON.parse(activeUser).surname,
      sentAt: new Date().toString(),
      index: msgArr.length,
    });
  }
  clearMsgInputBar();
  location.href = `#${msgArr.length - 1}`;
}

firebase
  .database()
  .ref("messages")
  .on("child_added", (snapshot) => {
    const response = snapshot.val();
    msgArr.push(response);
    loadMsg();
  });

function loadMsg() {
  displayMsgs.innerHTML = "";
  const sortMsgs = msgArr.sort((a, b) => a.index - b.index);
  sortMsgs.forEach((response) => {
    if (response.authorID === userToken) {
      displayMsgs.innerHTML += `
          <div class="sentByUserMsgBlock" id="${response.index}">
            <div class="sentByUseraboveMsg">
              ${response.fullname}
            </div>  
            <div class="sentByUsermsgContent">
              ${response.message}
            </div>
            <div class="sentByUsermsgDate">
              ${response.sentAt.split(" ").splice(0, 5).join(" ")}
            </div>
          </div>
        `;
    } else if (response.authorID === "022ef8a2-cc8b-438f-8093-5d92cff2f2bf") {
      displayMsgs.innerHTML += `
          <div class="msgBlock" id="${response.index}">
            <div class="aboveMsg">
              ${response.fullname}
            </div>  
            <div class="msgContent">
              ${response.message}
            </div>
            <div class="msgDate">
              ${response.sentAt.split(" ").splice(0, 5).join(" ")}
            </div>
          </div>
        `;
    }
  });
  if (userToken === "022ef8a2-cc8b-438f-8093-5d92cff2f2bf") {
    displayMsgs.innerHTML = "";
    const sortMsgs = msgArr.sort((a, b) => a.index - b.index);
    sortMsgs.forEach((response) => {
      if (response.authorID === userToken) {
        displayMsgs.innerHTML += `
          <div class="sentByUserMsgBlock" id="${response.index}">
            <div class="sentByUseraboveMsg">
              ${response.fullname}
            </div>  
            <div class="sentByUsermsgContent">
              ${response.message}
            </div>
            <div class="sentByUsermsgDate">
              ${response.sentAt.split(" ").splice(0, 5).join(" ")}
            </div>
          </div>
        `;
      } else {
        displayMsgs.innerHTML += `
          <div class="msgBlock" id="${response.index}">
            <div class="aboveMsg">
              ${response.fullname}
            </div>  
            <div class="msgContent">
              ${response.message}
            </div>
            <div class="msgDate">
              ${response.sentAt.split(" ").splice(0, 5).join(" ")}
            </div>
          </div>
        `;
      }
    });
  }
}
