import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type AppStore = {
    intentos: number,
    palabra: string,
    currentInputIndex: number,

    sumarIntentos: () => void,
    cambiarPalabra: (palabra: string) => void,
    setCurrentInputIndex: (index: number) => void,
}

export const useAppStore = create<AppStore>()(
    devtools (
        (set) => ({
            intentos: 0,
            palabra: 'parque',
            currentInputIndex: 0,
            sumarIntentos: () => set((state) => ({ intentos: state.intentos + 1 })),
            cambiarPalabra: (palabra: string) => set({ palabra }),
            setCurrentInputIndex: (index: number) => set({ currentInputIndex: index }),
        })
    )
);