import { palabras } from "@/data/palabras";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type AppStore = {
	intentos: number;
	palabra: string;
	ronda: number;
	finRonda: boolean;

	letrasUsadas: {
		correctas: string[];
		casiCorrectas: string[];
		incorrectas: string[];
	};
	resetLetrasUsadas: () => void;
	añadirLetrasCorrectas: (letra: string) => void;
	añadirLetrasCasiCorrectas: (letra: string) => void;
	añadirLetrasIncorrectas: (letra: string) => void;

	sumarIntentos: (n?: number) => void;
	resetIntentos: () => void;
	cambiarPalabra: (palabra: string) => void;
	nuevaRonda: () => void;
	alternarRonda: () => void;
};

export const useAppStore = create<AppStore>()(
	devtools((set) => ({
		intentos: 0,
		palabra: palabras[0].palabra,
		ronda: 0,
		finRonda: false,

		letrasUsadas: {
			correctas: [],
			casiCorrectas: [],
			incorrectas: [],
		},
		resetLetrasUsadas: () =>
			set({
				letrasUsadas: {
					correctas: [],
					casiCorrectas: [],
					incorrectas: [],
				},
			}),
		añadirLetrasCorrectas: (letra: string) =>
			set((state) => ({
				letrasUsadas: {
					correctas: [...state.letrasUsadas.correctas, letra],
					casiCorrectas: [...state.letrasUsadas.casiCorrectas],
					incorrectas: [...state.letrasUsadas.incorrectas],
				},
			})),
        añadirLetrasCasiCorrectas: (letra: string) =>
            set((state) => ({
                letrasUsadas: {
                    correctas: [...state.letrasUsadas.correctas],
                    casiCorrectas: [...state.letrasUsadas.casiCorrectas, letra],
                    incorrectas: [...state.letrasUsadas.incorrectas],
                },
            })),
        añadirLetrasIncorrectas: (letra: string) =>
            set((state) => ({
                letrasUsadas: {
                    correctas: [...state.letrasUsadas.correctas],
                    casiCorrectas: [...state.letrasUsadas.casiCorrectas],
                    incorrectas: [...state.letrasUsadas.incorrectas, letra],
                },
            })),

		sumarIntentos: (n: number = 1) => set((state) => ({ intentos: state.intentos + n })),
		resetIntentos: () => set({ intentos: 0 }),
		cambiarPalabra: (palabra: string) => set({ palabra }),
		nuevaRonda: () =>
			set((state) => {
				state.resetIntentos();
				state.resetLetrasUsadas();
				return {
					ronda: state.ronda + 1,
				};
			}),
		alternarRonda: () => set((state) => ({ finRonda: !state.finRonda })),
	}))
);
