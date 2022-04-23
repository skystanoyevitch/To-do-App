import React from "react";

export default function FilterButton(props) {
	return (
		<>
			<button
				type="button"
				aria-pressed={props.isPressed}
				onClick={() => {

					props.setFilter(props.name)
					props.image
				}}
			>
				Show {props.name} tasks
			</button>
		</>
	);
}
