import { useEffect, useId, useRef, useState } from "react";

import { CaretDown } from "./icons/CaretDown";
import { Tick } from "./icons/Tick";

import styles from "./Select.module.scss";

import type { Option } from "./types";

enum Key {
	ArrowDown = "ArrowDown",
	ArrowUp = "ArrowUp",
	Enter = "Enter",
	Space = "Space",
	Escape = "Escape",
}

interface SelectProps {
	open: boolean;
	label: string;
	name: string;
	selected?: Option;
	options: Option[];
	placeholder?: string;
	triggerIcon?: React.ReactNode;
	selectedIcon?: React.ReactNode;
	handleOpen: () => void;
	handleClose: () => void;
	handleSelect: (option: Option) => void;
	onSelectedChange?: (option: Option) => void;
}

export function Select(props: SelectProps) {
	const dropdownId = useId();
	const labelId = useId();
	const selectRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const optionRef = useRef<HTMLDivElement>(null);
	const [activeIndex, setActiveIndex] = useState(0);

	const {
		open,
		label,
		name,
		selected,
		options,
		placeholder,
		triggerIcon,
		selectedIcon,
		handleOpen,
		handleClose,
		handleSelect,
		onSelectedChange,
	} = props;

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (open) {
			if (event.code === Key.ArrowDown) {
				setActiveIndex(i => (i + 1) % options.length);
			}

			if (event.code === Key.ArrowUp) {
				setActiveIndex(i => (i - 1 + options.length) % options.length);
			}

			if (event.code === Key.Enter || event.code === Key.Space) {
				handleSelect(options[activeIndex]);
			}

			if (event.code === Key.Escape) {
				handleClose();
				triggerRef.current?.focus();
			}
		} else {
			if (
				event.code === Key.ArrowDown ||
				event.code === Key.Enter ||
				event.code === Key.Space
			) {
				handleOpen();
			}
		}
	};

	const handleBlur = (event: React.FocusEvent) => {
		// focus moves from the listbox to trigger
		if (
			event.target === optionRef.current &&
			event.relatedTarget === triggerRef.current
		) {
			return handleClose();
		}

		if (selectRef.current?.contains(event.relatedTarget)) {
			return;
		}

		handleClose();
	};

	useEffect(() => {
		if (selected && onSelectedChange) {
			onSelectedChange(selected);
		}
	}, [selected, onSelectedChange])

	const placeholderFallback = placeholder ?? "-- Select option --"

	return (
		<div className={styles.container}>
			<p className={styles.label} id={labelId}>
				{label}
			</p>
			{/* biome-ignore lint/a11y/noStaticElementInteractions: <utilizing event delegation> */}
			<div
				ref={selectRef}
				className={styles.select}
				onBlur={handleBlur}
				onKeyDown={handleKeyDown}
			>
				<button
					ref={triggerRef}
					tabIndex={0}
					type="button"
					aria-expanded={open}
					aria-labelledby={labelId}
					aria-controls={open ? dropdownId : undefined}
					className={styles.trigger}
					onClick={handleOpen}
				>
					{selected ? selected.children : placeholderFallback}
					{triggerIcon ?? (
						<i className={styles.icon} aria-hidden="true">
							<CaretDown />
						</i>
					)}
				</button>
				<input type="text" name={name} value={selected?.value ?? ''} readOnly hidden />

				{open && (
					// setting tabindex=-1 on listbox will:
					// - make it technically "tabbable" which would allow listbox to appear as a .relatedTarget on focus event
					// - practically it won't be "tabbable" because of descendant elements with tabindex=0
					<div
						role="listbox"
						tabIndex={-1}
						id={dropdownId}
						className={styles.dropdown}
						aria-labelledby={labelId}
					>
						{options.map((option, i) => (
							<SelectOption
								key={option.value}
								ref={activeIndex === i ? optionRef : undefined}
								selected={selected === option}
								selectedIcon={selectedIcon}
								tabIndex={activeIndex === i ? 0 : -1}
								handleSelect={() => handleSelect(option)}
							>
								{option.children}
							</SelectOption>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

interface SelectOptionProps {
	ref?: React.RefObject<HTMLDivElement | null>;
	selected: boolean;
	tabIndex: number;
	children: React.ReactNode;
	selectedIcon?: React.ReactNode;
	handleSelect: () => void;
}

function SelectOption(props: SelectOptionProps) {
	useEffect(() => {
		if (props.ref?.current) {
			props.ref?.current.focus();
		}
	}, [props.ref?.current]);

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <keyboard events are handled in the Select>
		<div
			ref={props.ref}
			role="option"
			aria-selected={props.selected}
			tabIndex={props.tabIndex}
			className={styles.option}
			onClick={props.handleSelect}
		>
			{props.children}
			{props.selected && (
				props.selectedIcon ?? (
					<i className={styles.icon} aria-hidden="true">
						<Tick />
					</i>
				)
			)}
		</div>
	);
}
