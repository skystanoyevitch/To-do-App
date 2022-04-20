import React from "react";

export default function Todo(props) {
	const taskList = props.tas;
	return (
		<>
			<li>
				<input
					id={props.id}
					htmlFor={props.id}
					type="checkbox"
					defaultChecked={props.completed}
					onChange={() => props.toggleTaskCompleted(props.id)}
				/>
				{props.name}
			</li>
			<button>Edit {props.name}</button>
			<button type="button" onClick={() => props.deleteTask(props.id)}>
				Delete {props.name}
			</button>
		</>
	);
}
