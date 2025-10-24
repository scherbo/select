import { useMemo, useState } from "react";
import "./App.css";
import { Select } from "./Select";

import type { Option } from "./types";

// this component will demonstrate different use cases;

// without form
// with form using FormData

function App() {
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState<Option>();
	const options = useMemo(() => [
		{ value: "lakers", children: "LA Lakers" },
		{ value: "clippers", children: "LA Clippers" },
		{ value: "nets", children: "NJ Nets" },
	], [])

	const handleSelect = (option: Option) => {
		setSelected(option);
		setOpen(false);
	}

	return (
		<div>
			<Select
				open={open}
				selected={selected}
				handleOpen={() => setOpen(true)}
				handleClose={() => setOpen(false)}
				handleSelect={handleSelect}
				options={options}
			/>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<button type="button" onClick={() => console.log('button clicked')}>click me</button>
		</div>
	);
}

export default App;
