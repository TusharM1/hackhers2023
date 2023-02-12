import "../styles/TopicSelector.css"
import TagsInput from 'react-tagsinput'
import { useState } from "react";
import { Button } from "react-bootstrap";

export default function TopicSelector({ switchToChat }) {
	const [state, setState] = useState({tags: []});

	const handleChange = (tags) => {
		setState({tags})
	}

	return (
		<div id={"selector-container"} className={"width-container"}>
			<div id={"topic-selector"}>
				<TagsInput value={state.tags}
						   onChange={handleChange}
						   onlyUnique={"true"}
							inputProps={{
								placeholder: 'Add your interests'
							}}
				/>
				<Button id={"startButton"} variant="primary" onClick={switchToChat}>Start Chatting</Button>
			</div>
		</div>
	)
}
