import React from "react";
import css from "./Styles/styles.module.css";
import Todo from "./Components/Todo";
import Form from "./Components/Form";
import FilterButton from "./Components/FilterButton"

export default function FrontPage(props) {
	const taskList = props.tasks?.map((task) => (
		<Todo
			id={task.id}
			name={task.name}
			completed={task.completed}
			key={task.id}
		/>
	));

	return (
		<>
			<div className={css.container}>
				<h1 className={css.title}>TODO APP</h1>
				<h2>What else needs to be done?</h2>
                <Form />
                <FilterButton />
                <FilterButton />
                <FilterButton />
				<h2>3 Tasks Remaining</h2>
				<ul className={css.lists}>{taskList}</ul>
			</div>
		</>
	);
}
