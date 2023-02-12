import "../styles/TopicSelector.css"
import TagsInput from 'react-tagsinput'
import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { InterestsContext } from "../contexts/InterestsContext";

export default function TopicSelector({ switchToChat }) {
	const [state, setState] = useState( []);
	const { setInterests } = useContext(InterestsContext);

	const handleChange = (tags) => {
		setState([...tags])
	}

	const onClick = (event) => {
		event.preventDefault();
		setInterests(state)
		switchToChat(event);
	}

	return (
		<div className={"width-container content-container"}>
			<div id={"topic-selector"}>
				<TagsInput value={state}
						   onChange={handleChange}
						   onlyUnique={"true"}
							inputProps={{
								placeholder: 'Add your interests'
							}}
				/>
				<Button id={"startButton"} variant="primary" onClick={onClick}>Start Chatting</Button>
			</div>
		</div>
	)
}
