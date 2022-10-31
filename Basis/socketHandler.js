//import { io } from "socket.io-client";
console.log("Hello Socket Client");

let socket;

socket = io.connect("http://localhost:3000");

socket.on("client connected", (data) => {
  console.log("client added", data);
});
