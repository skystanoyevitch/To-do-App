import React, { useState, useRef, useEffect } from "react";

function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

export default function Todo(props) {
	const [isEditing, setEditing] = useState(false);
	const [newName, setNewName] = useState("");
	const editFieldRef = useRef(null);
	const editButtonRef = useRef(null);
	const wasEditing = usePrevious(isEditing);
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
		<form onSubmit={handleSubmit}>
			<lable htmlFor={props.id}> New Name for {props.name}</lable>
			<input
				id={props.id}
				type="text"
				value={newName}
				onChange={handleChange}
				ref={editFieldRef}
			/>
			<button type="button" onClick={() => setEditing(false)}>
				Cancel {props.name}
			</button>
			<button type="submit">Save {props.name}</button>
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
			<button
				type="button"
				onClick={() => setEditing(true)}
				ref={editButtonRef}
			>
				Edit {props.name}
			</button>
			<button type="button" onClick={() => props.deleteTask(props.id)}>
				Delete {props.name}
			</button>
		</div>
	);

	useEffect(() => {
		if (!wasEditing && isEditing) {
			editFieldRef.current.focus();
		}
		if (wasEditing && !isEditing) {
			editButtonRef.current.focus();
		}
	}, [wasEditing, isEditing]);

	return (
		<>
			<li>{isEditing ? editTemplate : viewTemplate}</li>
		</>
	);
}
