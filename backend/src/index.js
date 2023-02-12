import { Server } from "socket.io";
import * as http from "http";

const httpServer = http.createServer();
const io = new Server(httpServer, {
	cors: {
		origin: "*"
	}
});

let users = {}

const PORT = 3001;
io.on('connection', (socket) => {
	console.log(${socket.id} "connected");

	socket.on("message", data => {
		users[data.socketID] = data.message;
		io.emit("messageResponse", "Received data from " + data.socketID)
		console.log("Users: " + JSON.stringify(users))
		console.log("Message Received: " + JSON.stringify(data))
	})

	socket.on('disconnect', () => {
		delete users[socket.id];
		console.log(socket.id + ' user disconnected');
		console.log()
	});
});

httpServer.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
