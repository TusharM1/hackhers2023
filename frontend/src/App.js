import Header from "./components/Header";
import ChatWindow from "./components/ChatWindow";
import TopicSelector from "./components/TopicSelector";
import { useEffect, useState } from "react";
import "./styles/App.css"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	const [state, setState] = useState("topic");

	const switchToChat = (e) => {
		e.preventDefault();
		setState("chat");
	};

	useEffect(() => {}, [state]);

	return (
		<div id={"main"}>
			<Header/>
			{ state.valueOf() === "chat" ?
				<ChatWindow /> :
				<TopicSelector switchToChat={ switchToChat } /> }
		</div>
	);
}

export default App;
