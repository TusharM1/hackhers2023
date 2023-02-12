import React, { useEffect, useState } from "react";
import socketIO from "socket.io-client";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
	MainContainer,
	ChatContainer,
	MessageList,
	Message,
	MessageInput,
} from "@chatscope/chat-ui-kit-react";

export default function ChatWindow() {
	const [socket, setSocket] = useState(null);
	useEffect(() => {
		const socket = socketIO.io('http://localhost:3001');
		socket.on('connect' , () => {
			console.log(socket.id)
			socket.emit('message', {
				socketID: socket.id,
				message: "this is our outgoing message"
			});
			socket.on("messageResponse", data => console.log(data))
		});
	}, [setSocket]);

	const [messages, setMessages] = useState([]);

	const addMessage = (message) => {
		setMessages([...messages,
			<Message key={messages.length}
					 model={{
						 message: message,
						 sentTime: "just now",
						 sender: "Joe",
					 }}
			/>]
		)
		console.log(messages)
	}

	return (
		<div className={"width-container content-container"}>
			<div style={{ position: "relative", height: "500px" }}>
				<MainContainer>
					<ChatContainer>
						<MessageList>
							{messages}
						</MessageList>
						<MessageInput placeholder="Type message here" onSend={addMessage}/>
					</ChatContainer>
				</MainContainer>
			</div>;
		</div>
	)
}
