import Header from "./components/Header";
import ChatWindow from "./components/ChatWindow";
import TopicSelector from "./components/TopicSelector";
import { useEffect, useState } from "react";

function App() {
	const [state, setState] = useState("topic");

	const switchToChat = (e) => {
		e.preventDefault();
		setState("chat");
	};

	useEffect(() => {}, [state]);

	return (
		<>
			<Header/>
			{ state.valueOf() === "chat" ?
				<ChatWindow /> :
				<TopicSelector switchToChat={ switchToChat } /> }
		</>
	);
}

export default App;
