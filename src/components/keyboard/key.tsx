import { sleep } from "@/lib/utils";
import { useState } from "react";

interface Props {
	letter: string;
}

export const Key = ({ letter }: Props) => {

  const [teclaPresionada, setTeclaPresionada] = useState(false);

  const onClick = async () => {
    setTeclaPresionada(true);
    await sleep(200);
    setTeclaPresionada(false);
  }

	return (
		<div 
      className={`
        bg-gray-100 text-xl flex items-center justify-center p-3 border w-12 h-12 hover:cursor-pointer
        transition-all
          ${teclaPresionada? "bg-gray-400" : ""}
      `}
      onClick={onClick}
    >
			<span className="font-bold">{letter.toUpperCase()}</span>
		</div>
	);
};
