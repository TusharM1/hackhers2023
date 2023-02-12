import Header from "./components/Header";
import ChatWindow from "./components/ChatWindow";
import TopicSelector from "./components/TopicSelector";
import { useEffect, useState } from "react";
import "./styles/App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { InterestsContext } from "./contexts/InterestsContext";

function App() {
	const [interests, setInterests] = useState({});
	const [state, setState] = useState("topic");

	const switchToChat = () => {
		setState("chat");
	};

	useEffect(() => {}, [state]);

	return (
		<InterestsContext.Provider value={{ interests, setInterests }}>
			<div id={"main"}>
				<Header/>
				{ state.valueOf() === "chat" ?
					<ChatWindow /> :
					<TopicSelector switchToChat={ switchToChat } /> }
			</div>
		</InterestsContext.Provider>
	);
}

export default App;
