import React, { useState } from "react";

export default function Todo(props) {
	const [isEditing, setEditing] = useState(false);
	const [newName, setNewName] = useState("");
	const taskList = props.task;

	function handleChange(e) {
		setNewName(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		props.editTask(props.id, newName);
		setNewName("");
		setEditing(false);
	}

	const editTemplate = (
		<form>
			<lable htmlFor={props.id}> New Name for {props.name}</lable>
			<input
				id={props.id}
				type="text"
				value={newName}
				onChange={handleChange}
			/>
			<button type="button" onClick={() => setEditing(false)}>
				Cancel {props.name}
			</button>
			<button type="button" onSubmit={handleSubmit}>
				Save {props.name}
			</button>
		</form>
	);

	const viewTemplate = (
		<div>
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
			<button type="button" onClick={() => setEditing(true)}>
				Edit {props.name}
			</button>
			<button type="button" onClick={() => props.deleteTask(props.id)}>
				Delete {props.name}
			</button>
		</div>
	);
	return (
		<>
			<li>{isEditing ? editTemplate : viewTemplate}</li>
		</>
	);
}
