import { IoInformationCircle, IoSettings } from "react-icons/io5"

import { InputsGrid, Keyboard } from "@/components"
import { Completado } from "@/components/modal/Completado"
import { useAppStore } from "@/store/zustand";
import { palabras } from "./data/palabras";

function App() {

  const cambiarPalabra = useAppStore((store) => store.cambiarPalabra);

  const ronda = useAppStore((store) => store.ronda);
  const aumentarRonda = useAppStore((store) => store.nuevaRonda);

  const finRonda = useAppStore((store) => store.finRonda);
  const alternarRonda = useAppStore((store) => store.alternarRonda);
  
  const handleModalClose = () => {
    cambiarPalabra(palabras[ronda].palabra);
    alternarRonda();
    aumentarRonda();
  }

  return (
    <div className='w-2/4 mx-auto my-5 flex flex-col gap-10'>
        <nav className='flex items-center justify-between border-b p-3'>
            <IoInformationCircle className='text-gray-700' size={25}/>
            <h1 className='text-3xl font-bold'>WORDLE</h1>
            <IoSettings className='text-gray-700' size={25}/>
        </nav>
        <InputsGrid />
        <Keyboard />
        <Completado isOpen={finRonda} handleClose={handleModalClose}/>
    </div>
  )
}

export default App
