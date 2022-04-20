import React, { useState } from "react";

export default function Form(props) {
	function handleCHange(e) {
		setName(e.target.value);
	}
	const [name, setName] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		props.addTask(name);
		setName("");
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="task"
					value={name}
					autoComplete="off"
					onChange={handleCHange}
				/>
				<button type="submit">add task</button>
			</form>
		</>
	);
}
