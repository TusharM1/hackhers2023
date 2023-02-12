import { Server } from "socket.io";
import * as http from "http";
import { Configuration, OpenAIApi } from "openai";

const httpServer = http.createServer();
const io = new Server(httpServer, {
	cors: {
		origin: "*"
	}
});

// let users = {}

const configuration = new Configuration({
	apiKey: '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',
});
const openai = new OpenAIApi(configuration);

let connected_users = [];
let waiting_users = [];

const PORT = 3001;
io.on('connection', (socket) => {
	console.log(socket.id + " connected");

	socket.on("interests", (data) => {
		const user = {
			socket: socket,
			interests: data["interests"]
		};
		waiting_users.push(user);
		console.log(user["interests"])

		console.log(waiting_users.length)
		if (waiting_users.length >= 2) {
			const user1 = waiting_users.shift();
			const user2 = waiting_users.shift();

			// connect users
			connected_users[user1["socket"].id] = user2;
			connected_users[user2["socket"].id] = user1;

			console.log(user1.interests + " " + user2.interests);

			// get create question from interest
			(async () => {
				const response = await openai.createCompletion({
					model: "text-davinci-003",
					prompt: "Create a single simple icebreaker question for two people given their interests."+
						"The two people do not know each other's interests, so try to create an icebreaker that is relevant to at least one topic and at most two topics from each person's interests."+
						"The icebreaker should be relevant to both people's interests and the question should combine their interests in some way." +
						"Person 1\'s interest is " + user1.interests + ". Person 2\'s interest is + " + user2.interests + ".",
					max_tokens: 100,
					temperature: 0.3,
				});

				const question = response.data.choices[0].text

				console.log(question)

				// present to both users
				user1["socket"].emit("question", question);
				user2["socket"].emit("question", question);
			})();
			// const question = "hello"
		}

		// socket.emit("question", user["interests"])
	})

	// socket.emit("question", "This is a question");





	socket.on("message", data => {
		// waiting_users[data.socketID] = data.interests;

		connected_users[socket.id]["socket"].emit("messageResponse", data);

		// console.log("Users: " + JSON.stringify(users))
		// if (Object.keys(users).length > 1){
		// 	let u1 = {
		// 		connection: Object.keys(users)[1],
		// 		message: users[0]
		// 	}
		// 	let u2 = {
		// 		connection: Object.keys(users)[0],
		// 		message: users[1]
		// 	};
		//
		// 	// connections.keys = socketid
		// 	// connections.value = js object containing person
		// 	// connected to, and their own interests
		// 	connections[Object.keys(users)[0]] = u1;
		// 	connections[Object.keys(users)[1]] = u2;
		// 	processInfo(users[u1.message],users[u2.message]);
		// 	users.delete(Object.keys(users)[0]);
		// 	users.delete(Object.keys(users)[1]);
		// }
	})


	// socket.on('disconnect', () => {
	// 	if (socket.id in users){
	// 		delete users[socket.id];
	// 	}
	// 	else{
	// 		let info = connections[socket.id];
	// 		users[socket.id] = info.message;
	// 		delete connections[socket.id];
	// 		if (Object.keys(users).length > 1){
	// 			let u1 = {
	// 				connection: Object.keys(users)[1],
	// 				message: users[0]
	// 			}
	// 			let u2 = {
	// 				connection: Object.keys(users)[0],
	// 				message: users[1]
	// 			};
	//
	// 			// connections.keys = socketid
	// 			// connections.value = js object containing person
	// 			// connected to, and their own interests
	// 			connections[Object.keys(users)[0]] = u1;
	// 			connections[Object.keys(users)[1]] = u2;
	// 			processInfo(users[u1.message],users[u2.message]);
	// 			users.delete(Object.keys(users)[0]);
	// 			users.delete(Object.keys(users)[1]);
	// 		}
	// 	}
	//
	//
	// 	console.log(socket.id + ' user disconnected');
	// 	console.log()
	//
	// });
});

// function getRandomInt(max) {
// 	return Math.floor(Math.random() * max);
// }
//
// function processInfo(list1, list2){
// 	const { Configuration, OpenAIApi } = require("openai");
// 	const configuration = new Configuration({
// 		apiKey: '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',
// 	});
// 	const openai = new OpenAIApi(configuration);
//
// 	/* Outcome 1: Both users have interests */
// 	if ((list1.length != 0) && (list2.length != 0)) {
// 		const r1 = getRandomInt(list1.length - 1);
// 		const r2 = getRandomInt(list2.length - 1);
// 		const w1 = list1[r1];
// 		const w2 = list2[r2];
// 		(async () => {
// 			const response = await openai.createCompletion({
// 				model: "text-davinci-003",
// 				prompt: "Create a single simple icebreaker question for two people given their interests."+
// 					"The two people do not know each other's interests, so try to create an icebreaker that is relevant to at least one topic and at most two topics from each person's interests."+
// 					"The icebreaker should be relevant to both people's interests and the question should combine their interests in some way." +
// 					"Person 1\'s interest is " + w1 + ". Person 2\'s interest is + " + w2 + ".",
// 				max_tokens: 100,
// 				temperature: 0.3,
// 			});
// 			console.log(response.data.choices[0].text)
// 		})();
// 	}
// 	/* Outcome 2: Only one user has interests */
// 	else if ((list1.length != 0) ^ (list2.length != 0)){
// 		let w = '';
// 		let r = 0;
// 		if (list1.length == 0){
// 			r = getRandomInt(list2.length - 1);
// 			w = list2[r]
// 		}
// 		else{
// 			r = getRandomInt(list1.length - 1);
// 			w = list1[r]
// 		}
//
// 		(async () => {
// 			const response = await openai.createCompletion({
// 				model: "text-davinci-003",
// 				prompt: "Create a single simple icebreaker question for two people given their interests."+
// 					"The two people do not know each other's interests, so try to create an icebreaker that is relevant to at least one topic."+
// 					"The icebreaker should be relevant to both people's interests and the question should combine their interests in some way." +
// 					"Person 1\'s interest is " + w + ". Person 2 does not have any interests",
// 				max_tokens: 100,
// 				temperature: 0.3,
// 			});
// 			console.log(response.data.choices[0].text)
// 		})();
// 	}
// 	/* Outcome 3: No users have interests */
// 	else if ((list1.length == 0) && (list2.length == 0)){
// 		(async () => {
// 			const response = await openai.createCompletion({
// 				model: "text-davinci-003",
// 				prompt: "Create a single simple icebreaker question for two people.",
// 				max_tokens: 100,
// 				temperature: 0.3,
// 			});
// 			console.log(response.data.choices[0].text)
// 		})();
// 	}
// }


httpServer.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
