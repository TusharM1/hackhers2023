import socketIO from "socket.io-client";

export default function ChatWindow() {
	const socket = socketIO.io('http://localhost:3001');
	socket.on('connect' , () => {
		console.log(socket.id)
		socket.emit('message', {
			socketID: socket.id,
			message: "this is our outgoing message"
		});
		socket.on("messageResponse", data => console.log(data))
	});

	return (
		<div>Chat Window</div>
	)
}
