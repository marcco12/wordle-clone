import { v4 as uuid } from "uuid";
import { Key } from "@/components";

const keyboardLayout = [
	["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
	["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ"],
	["z", "x", "c", "v", "b", "n", "m"],
];

export const Keyboard = () => {
	return (
		<div className="flex flex-col gap-1">
			{keyboardLayout.map((row) => {
				return (
					<div
						key={uuid()}
						className="flex items-center justify-center gap-1"
					>
						{row.map((letter) => (
							<Key key={uuid()} letter={letter} />
						))}
					</div>
				);
			})}
		</div>
	);
};
