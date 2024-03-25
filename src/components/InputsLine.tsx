import React, { useEffect, useRef, useState } from "react";

import { useAppStore } from "@/store/zustand";

interface Props {
	idLinea: number;
}

export const InputsLine = ({ idLinea }: Props) => {
	const palabra = useAppStore((store) => store.palabra);
	const intentos = useAppStore((store) => store.intentos);
	const sumarIntentos = useAppStore((store) => store.sumarIntentos);
	const alternarRonda = useAppStore((store) => store.alternarRonda);
	const añadirLetrasCorrectas = useAppStore((store) => store.añadirLetrasCorrectas);
	const añadirLetrasIncorrectas = useAppStore((store) => store.añadirLetrasIncorrectas);
	const añadirLetrasCasiCorrectas = useAppStore((store) => store.añadirLetrasCasiCorrectas);

	const length = palabra.length;

	const [wordLine, setWordLine] = useState(
		new Array(palabra.length).fill("")
	);
	const inputRefs = useRef<any>([]);

	useEffect(() => {
		if (inputRefs.current[0]) {
			inputRefs.current[0].focus();
		}
	}, []);

	const handleChange = (
		index: number,
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = e.target.value;

		const newWordLine = [...wordLine];
		// allow only one input
		newWordLine[index] = value.substring(value.length - 1);
		
		setWordLine(newWordLine);

		// Move to next input if current field is filled
		if (value && index < length - 1 && inputRefs.current[index + 1]) {
			inputRefs.current[index + 1].focus();
		}
	};

	const handleClick = (index: number) => {
		inputRefs.current[index].setSelectionRange(1, 1);

		// optional (Hace que el focus siempre vaya al primer campo vacio)
		if (index > 0 && !wordLine[index - 1]) {
			inputRefs.current[wordLine.indexOf("")].focus();
		}
	};

	const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
		if (
			e.key === "Backspace" &&
			!wordLine[index] &&
			index > 0 &&
			inputRefs.current[index - 1]
		) {
			// Move focus to the previous input field on backspace
			inputRefs.current[index - 1].focus();
		} else if (e.key === "Enter" && index === length - 1) {
			// Proceso para comprobar si se ha completado la palabra
			verificarLinea();
			
			// const nextInput = document.getElementById(`linea-${idLinea}`);
			// console.log(nextInput?.nextElementSibling?.firstElementChild);
			
			// nextInput?.focus();
		}
	};

	const verificarLinea = () => {
		
		inputRefs.current.map((input: HTMLInputElement, index: number) => {
			const letraActual = input.value.toLowerCase();
			
			if (palabra[index] === letraActual) { // La letra está en la posicion correcta
				input.classList.add('correct-letter')
				añadirLetrasCorrectas(letraActual);
			} else if (palabra.includes(letraActual)) { // La letra está en la palabra
				input.classList.add('close-letter')
				añadirLetrasCasiCorrectas(letraActual);
			} else { // La letra no está en la palabra
				input.classList.add('wrong-letter')
				añadirLetrasIncorrectas(letraActual);
			}
		});

		if (
			intentos === 4 ||
			wordLine.join("") === palabra.toLowerCase()
		) { // Fin de partida
			alternarRonda();
			sumarIntentos(6); // Sumo varios intentos para deshabilitar todas las lineas
			return;
		}
		
		// Pasamos a la siguiente linea
		sumarIntentos();
	}
	return (
		<div className="flex items-center gap-1" id={`linea-${idLinea}`}>
			{palabra.split("").map((_, index) => (
				<input
					type="text"
					className="rounded-lg border border-gray-400 p-2 w-14 h-14 text-3xl text-center font-bold uppercase"
					key={index}
					ref={(input) => (inputRefs.current[index] = input)}
					onChange={(e) => handleChange(index, e)}
					onClick={() => handleClick(index)}
					onKeyDown={(e) => handleKeyDown(index, e)}
					maxLength={1}
					value={wordLine[index]}
					disabled={idLinea !== intentos}
					id={`input-${idLinea}-${index}`}
				/>
			))}
		</div>
	);
};
