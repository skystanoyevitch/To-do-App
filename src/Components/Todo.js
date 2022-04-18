import React from "react";

export default function Todo(props) {
    const taskList = props.tas
	return (
		<>
			<li>
				<input
					id={props.id}
					htmlFor={props.id}
					type="checkbox"
					defaultChecked={props.completed}
				/>
				{props.name}
			</li>
			<button>Edit {props.name}</button>
			<button>Delete {props.name}</button>
		</>
	);
}
