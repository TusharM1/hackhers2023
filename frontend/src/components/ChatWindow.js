import socketIO from "socket.io-client";
import { useEffect } from "react";

export default function ChatWindow() {
	const socket = socketIO.connect("http://localhost:3001")

	useEffect(()=> {
		socket.emit('message', "hello");
		socket.on("messageResponse", data => console.log(data))
	}, [socket])

	return (
		<div>Chat Window</div>
	)
}
