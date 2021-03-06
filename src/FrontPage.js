import React, { useState, useRef, useEffect } from "react";
import css from "./Styles/styles.module.css";
import Todo from "./Components/Todo";
import Form from "./Components/Form";
import FilterButton from "./Components/FilterButton";
import { nanoid } from "nanoid";

const FILTER_MAP = {
	All: () => true,
	Active: (task) => !task.completed,
	Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

export default function FrontPage(props) {
	const [tasks, setTasks] = useState(props.tasks);
	const [filter, setFilter] = useState("All");
	const [image, setImage] = useState("");
	const [term, setTerm] = useState("");

	useEffect(() => {
		const randomImage = Math.floor(Math.random() * 10);
		fetch(
			`https://api.unsplash.com/photos/?client_id=${process.env.REACT_APP_API_KEY}`
		)
			.then((res) => res.json())
			.then((data) => {
				// setImage(data);
				console.log(image);
			})
			.catch((err) => console.log(err));

		return setImage("");
	}, [setImage]);

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

	function editTask(id, newName) {
		const editedTasks = tasks.map((task) => {
			if (id === task.id) {
				return { ...task, name: newName };
			}
			return task;
		});
		setTasks(editedTasks);
	}

	const taskList = tasks
		.filter(FILTER_MAP[filter])
		.map((task) => (
			<Todo
				id={task.id}
				name={task.name}
				completed={task.completed}
				key={task.id}
				toggleTaskCompleted={toggleTaskCompleted}
				deleteTask={deleteTask}
				editTask={editTask}
			/>
		));

	const filterlist = FILTER_NAMES.map((name) => (
		<FilterButton
			key={name}
			name={name}
			isPressed={name === filter}
			setFilter={setFilter}
		/>
	));

	const tasksNoun = taskList.length !== 1 ? "Tasks" : "Task";
	const heading = `${taskList.length} ${tasksNoun} remaining`;
	const listHeadingRef = useRef(null);
	const prevTaskLength = usePrevious(tasks.length);

	useEffect(() => {
		if (tasks.length - prevTaskLength === -1) {
			listHeadingRef.current.focus();
		}
	}, [tasks.length, prevTaskLength]);

	const activeImage = filter === "Active" && image;
	// const activeImage = image.map((url) => {

	// })

	return (
		<>
			<div
				className={css.container}
				style={{ backgroundImage: `url(${activeImage})` }}
			>
				<h1 className={css.title}>TODOLIFY</h1>
				<h2 tabIndex="-1" ref={listHeadingRef}>
					{heading}
				</h2>
				<Form addTask={addTask} />
				{filterlist}
				<ul className={css.lists}>{taskList}</ul>
			</div>
		</>
	);
}
