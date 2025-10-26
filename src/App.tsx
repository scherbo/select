import { useMemo, useState } from "react";
import "./App.css";
import { Select } from "./Select";

import type { Option } from "./types";

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

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const fd = new FormData(event.currentTarget);

		console.log('fd: ', fd)
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<Select
					label="Pick something"
					name="team"
					open={open}
					selected={selected}
					handleOpen={() => setOpen(true)}
					handleClose={() => setOpen(false)}
					handleSelect={handleSelect}
					options={options}
				/>
				<br />
				<button type="submit">Submit form</button>
			</form>
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

			<p>Select does not have a backdrop, so it does not block the whole viewport when it's opened. Check it by opening the Select and clicking the button below.</p>	
			<button type="button" onClick={() => alert('button clicked')}>click me</button>
		</div>
	);
}

export default App;
