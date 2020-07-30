const socket = io();

let name;
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message_area")
do {
    name = prompt("Please enter your name: ")
} while (!name);

textarea.addEventListener("keyup", (e) => {
    if ((e.key ==="Enter")&&(textarea.value.length>1)) {
        sendMessage(e.target.value);
    }
});
function handleClick() {
    if(textarea.value.length>0)
        sendMessage(textarea.value);
}

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }
    // APPEND
    appendMessage(msg, "outgoing");
    textarea.value = "";
    scrollToBottom();

    // SEND TO SERVER
    socket.emit("message", msg);
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement("div");
    let classname = type;
    mainDiv.classList.add(classname, "message");

      let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);

}

// RECEIVE MESSAGE

socket.on("message", (msg) => {
    let audio = new Audio('ding.mp3');
    audio.play();
    appendMessage(msg, "incoming");
    scrollToBottom();
       
});

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}
