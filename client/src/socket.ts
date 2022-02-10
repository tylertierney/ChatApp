import socketIOClient from "socket.io-client";

const ENDPOINT = "http://192.168.254.32:4001";
const socket = socketIOClient(ENDPOINT);

export default socket;
