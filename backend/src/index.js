import { Server } from "socket.io";
import * as http from "http";

const httpServer = http.createServer();
const io = new Server(httpServer, {
	cors: {
		origin: "http://localhost:3000"
	}
});

const PORT = 3001;
io.on('connection', (socket) => {
	console.log(`${socket.id} user just connected!`)

	socket.on("message", data => {
		io.emit("messageResponse", data)
		console.log("Message Received")
		console.log(data)
	})

	socket.on('disconnect', () => {
		console.log('user disconnected');
		console.log()
	});
});

httpServer.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
