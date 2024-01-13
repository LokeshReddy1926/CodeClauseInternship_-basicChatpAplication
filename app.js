const vikasSelectorBtn = document.querySelector("#vikas-selector");
const lokeshSelectorBtn = document.querySelector("#lokesh-selector");
const chatHeader = document.querySelector(".chat-header");
const chatMessages = document.querySelector(".chat-messages");
const chatInputForm = document.querySelector(".chat-input-form");
const chatInput = document.querySelector(".chat-input");
const clearChatBtn = document.querySelector(".clear-chat-button");

const messages = JSON.parse(localStorage.getItem("messages")) || [];

const createChatMessageElement = (message) => `
  <div class="message ${message.sender === "vikas" ? "blue-bg" : "gray-bg"}">
    <div class="message-sender">${message.sender}</div>
    <div class="message-text">${message.text}</div>
    <div class="message-timestamp">${message.timestamp}</div>
  </div>
`;

window.onload = () => {
  messages.forEach((message) => {
    chatMessages.innerHTML += createChatMessageElement(message);
  });
};

let messageSender = "vikas";

const updateMessageSender = (name) => {
  messageSender = name;
  chatHeader.innerText = `${messageSender} chatting...`;
  chatInput.placeholder = `Type here, ${messageSender}...`;

  if (name === "vikas") {
    vikasSelectorBtn.classList.add("active-person");
    lokeshSelectorBtn.classList.remove("active-person");
  }
  if (name === "lokesh") {
    lokeshSelectorBtn.classList.add("active-person");
    vikasSelectorBtn.classList.remove("active-person");
  }

  /* auto-focus the input field */
  chatInput.focus();
};

vikasSelectorBtn.onclick = () => updateMessageSender("vikas");
lokeshSelectorBtn.onclick = () => updateMessageSender("lokesh");

const sendMessage = (e) => {
  e.preventDefault();

  const timestamp = new Date().toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const message = {
    sender: messageSender,
    text: chatInput.value,
    timestamp,
  };

  /* Save message to local storage */
  messages.push(message);
  localStorage.setItem("messages", JSON.stringify(messages));

  /* Add message to DOM */
  chatMessages.innerHTML += createChatMessageElement(message);

  /* Clear input field */
  chatInputForm.reset();

  /*  Scroll to the bottom of chat messages */
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

chatInputForm.addEventListener("submit", sendMessage);

clearChatBtn.addEventListener("click", () => {
  localStorage.clear();
  chatMessages.innerHTML = "";
});
