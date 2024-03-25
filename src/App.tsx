import { IoInformationCircle, IoSettings } from "react-icons/io5"
import { InputsGrid, Keyboard } from "@/components"

function App() {
  

  return (
    <div className='w-2/4 mx-auto my-5 flex flex-col gap-10'>
        <nav className='flex items-center justify-between border-b p-3'>
            <IoInformationCircle className='text-gray-700' size={25}/>
            <h1 className='text-3xl font-bold'>WORDLE</h1>
            <IoSettings className='text-gray-700' size={25}/>
        </nav>
        <InputsGrid />
        <Keyboard />
    </div>
  )
}

export default App
