import type { Meta, StoryObj } from "@storybook/react-vite";

import { useArgs } from "storybook/preview-api";

import { Select } from "./Select";
import type { Option } from "./types";

const meta = {
	title: "Select",
	component: Select,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		open: false,
		label: "Pick a fruit",
		handleOpen: () => {},
		handleClose: () => {},
		handleSelect: () => {},
		onSelectedChange: console.log,
		options: [
			{ value: "apple", children: "🍎 Apple" },
			{ value: "banana", children: "🍌 Banana" },
			{ value: "coconut", children: "🥥 Coconut" },
		],
	},
	render: function Render(args) {
		const [{ open, selected }, updateArgs] = useArgs();

		function handleOpen() {
			updateArgs({ open: true });
		}

		function handleClose() {
			updateArgs({ open: false });
		}

		function handleSelect(option: Option) {
			updateArgs({ selected: option, open: false });
		}

		return (
			<Select
				{...args}
				open={open}
				selected={selected}
				handleOpen={handleOpen}
				handleClose={handleClose}
				handleSelect={handleSelect}
			/>
		);
	},
};
