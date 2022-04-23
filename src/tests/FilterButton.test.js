import React from "react";
import renderer from "react-test-renderer";
import FilterButton from "../Components/FilterButton";

test("Button changes name when clicked", () => {
	const component = renderer.create(
		<FilterButton
			onClick={() => {
				props.setFilter(props.name);
			}}
		/>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
