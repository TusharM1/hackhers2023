import socketIO from "socket.io-client";

export default function ChatWindow() {
	const socket = socketIO.io('http://172.31.50.252:3001');
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
