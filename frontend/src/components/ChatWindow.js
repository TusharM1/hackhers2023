import React, { useEffect, useState } from "react";
import socketIO from "socket.io-client";
import { Input, MessageList } from "react-chat-elements";
import 'react-chat-elements/dist/main.css';
import { Button } from "react-bootstrap";

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

	const [messageListArray, setMessageListArray] = useState([])
	const messageListReferance = React.createRef();
	const inputReferance = React.useRef()

	let clearRef = () => {console.log("Clear")}
	function useForceUpdate() {
		const [value, setValue] = useState(0)
		return () => setValue(() => value + 1)
	}
	const forceUpdate = useForceUpdate()

	const addMessage = (message) => {
		setMessageListArray([...messageListArray, {
			position:"right",
			type:"text",
			title:"Emre",
			text:message,
		}])
		console.log(message)
		clearRef()
		forceUpdate()
	}

	const [chatInfo, setChatInfo] = useState({
		"name": "Kursat",
		"avatar" : "https://avatars.githubusercontent.com/u/80540635?v=4",
		"subtitle" : "Why don't we go to the mall this weekend ?"
	})

	const [, updateState] = React.useState();

	return (
		<div className={"width-container content-container"}>
			{/*<MessageList*/}
			{/*	className='message-list'*/}
			{/*	lockable={true}*/}
			{/*	toBottomHeight={'100%'}*/}
			{/*	referance={messageListReferance}*/}
			{/*	 dataSource={messageListArray}/>*/}
			{/*<Input*/}
			{/*	className='rce-example-input'*/}
			{/*	placeholder='Write your message here.'*/}
			{/*	defaultValue=''*/}
			{/*	referance={inputReferance}*/}
			{/*	clear={(clear) => (clearRef = clear)}*/}
			{/*	maxHeight={50}*/}
			{/*	// onKeyPress={(e) => {*/}
			{/*	// 	if (e.shiftKey && e.charCode === 13) {*/}
			{/*	// 		return true*/}
			{/*	// 	}*/}
			{/*	// 	if (e.key === ) {*/}
			{/*	// 		clearRef()*/}
			{/*	// 		addMessage(e.target.value)*/}
			{/*	// 	}*/}
			{/*	// }}*/}
			{/*	rightButtons={<Button text='Submit' onClick={(event) => addMessage(event.target.valueOf())}>Send</Button>}*/}
			{/*/>*/}

			<MessageList chatInfo={chatInfo}
						 chatType={"text"}
						 updateState={updateState}
						 dataSource={messageListArray}
						 lockable={true}
						 toBottomHeight={'100%'}
						 referance={messageListReferance}/>
		</div>
	)
}
