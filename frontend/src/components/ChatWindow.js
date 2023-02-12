import React, { useContext, useEffect, useState } from "react";
import socketIO from "socket.io-client";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
	MainContainer,
	ChatContainer,
	MessageList,
	Message,
	MessageInput,
} from "@chatscope/chat-ui-kit-react";
import { InterestsContext } from "../contexts/InterestsContext";
import { Alert } from "react-bootstrap";

export default function ChatWindow() {
	const [socket, setSocket] = useState(null);
	const [question, setQuestion] = useState("");
	const { interests } = useContext(InterestsContext);
	const [messages, setMessages] = useState([]);

	const addMessage = (message, direction) => {
		setMessages([...messages,
			<Message key={messages.length}
					 model={{
						 message: message,
						 sentTime: "just now",
						 direction: direction
					 }}
			/>]
		)
		console.log(messages)
		if (direction === 1) {
			socket.emit("message", message);
		}
	}

	useEffect(() => {
		const socket = socketIO.io('http://172.31.151.8:3001');
		socket.on('connect' , () => {
			console.log(socket.id + " " + interests)
			socket.emit('interests', {
				interests: interests
			});
			socket.on("question", data => {
				console.log(data)
				setQuestion(data);
			})
			socket.on("messageResponse", data => {
				addMessage(data, 0)
			})
		});
		setSocket(socket)
	}, [setSocket]);

	return (
		<div className={"width-container content-container"}>
			<Alert id={"question"}>Question: {question}</Alert>
			<div style={{ position: "relative", height: "500px" }}>
				<MainContainer>
					<ChatContainer>
						<MessageList>
							{messages}
						</MessageList>
						<MessageInput placeholder="Type message here"
									  onSend={(message) => addMessage(message, 1)}/>
					</ChatContainer>
				</MainContainer>
			</div>
		</div>
	)
}
