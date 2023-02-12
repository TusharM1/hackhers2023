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

export default function ChatWindow() {
	const [socket, setSocket] = useState(null);
	const { interests } = useContext(InterestsContext);
	useEffect(() => {
		const socket = socketIO.io('http://localhost:3001');
		socket.on('connect' , () => {
			console.log(socket.id + " " + interests)
			socket.emit('message', {
				socketID: socket.id,
				interests: interests
			});
			socket.on("messageResponse", data => {
				addMessage(data, 0)
			})
		});
	}, [setSocket]);

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
	}

	return (
		<div className={"width-container content-container"}>
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
			</div>;
		</div>
	)
}
