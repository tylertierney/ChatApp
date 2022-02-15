import socketIOClient from "socket.io-client";

// const ENDPOINT = "http://192.168.254.32:6066";
const ENDPOINT = "https://chatmosphere-backend.herokuapp.com/";

const socket = socketIOClient(ENDPOINT);

export default socket;
