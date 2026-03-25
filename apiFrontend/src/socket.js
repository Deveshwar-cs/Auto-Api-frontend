import {io} from "socket.io-client";
const token = localStorage.getItem("token");
const socket = io("https://auto-api-backend.onrender.com", {
  auth: {
    token,
  },
});

export default socket;
