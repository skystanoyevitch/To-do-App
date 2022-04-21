import React from "react";
import FrontPage from "./FrontPage";

const DATA = [
	{ id: "todo-0", name: "Eat", completed: true },
	{ id: "todo-1", name: "Sleep", completed: false },
	{ id: "todo-2", name: "Repeat", completed: false },
];
export default function App() {
	return (
		<div>
			<FrontPage tasks={DATA} />
		</div>
	);
}
