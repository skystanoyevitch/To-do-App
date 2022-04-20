import React, { useState } from "react";
import css from "./Styles/styles.module.css";
import Todo from "./Components/Todo";
import Form from "./Components/Form";
import FilterButton from "./Components/FilterButton";
import { nanoid } from "nanoid";

export default function FrontPage(props) {
	const [tasks, setTasks] = useState(props.tasks);

	function addTask(name) {
		const newTask = {
			id: "Todo-" + nanoid(),
			name: name,
			completed: false,
		};
		setTasks([...tasks, newTask]);
	}

	function toggleTaskCompleted(id) {
		const updatedTasks = tasks.map((task) => {
			if (id === task.id) {
				return { ...task, completed: !task.completed };
			}
			return task;
		});

		setTasks(updatedTasks);
	}

	function deleteTask(id) {
		const remainingTasks = tasks.filter((task) => id !== task.id);
		setTasks(remainingTasks);
	}

	const taskList = tasks.map((task) => (
		<Todo
			id={task.id}
			name={task.name}
			completed={task.completed}
			key={task.id}
			toggleTaskCompleted={toggleTaskCompleted}
			deleteTask={deleteTask}
		/>
	));

	const tasksNoun = taskList.length !== 1 ? "Tasks" : "task";
	const heading = `${taskList.length} ${tasksNoun} remaining`;

	return (
		<>
			<div className={css.container}>
				<h1 className={css.title}>TODO APP</h1>
				<h2> {heading} </h2>
				<Form addTask={addTask} />
				<FilterButton />
				<FilterButton />
				<FilterButton />
				<ul className={css.lists}>{taskList}</ul>
			</div>
		</>
	);
}
