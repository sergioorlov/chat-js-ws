const status = document.getElementById("status");
const messages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");

var HOST = location.origin.replace(/^http/, "ws");
var ws = new WebSocket(HOST);

function setStatus(value) {
  status.innerHTML = value;
}

function printMessage(value) {
  const li = document.createElement("li");
  li.innerHTML = value;
  messages.appendChild(li);
}

form.addEventListener("submit", e => {
  e.preventDefault();
  ws.send(input.value);
  input.value = "";
});

ws.onopen = () => setStatus("ONLINE");
ws.onclose = () => setStatus("DISCONNECTED");
ws.onmessage = response => printMessage(response.data);
