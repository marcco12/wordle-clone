import { InputsLine } from '.';
import { useAppStore } from '@/store/zustand';
import {v4 as uuid} from 'uuid';

export const InputsGrid = () => {

  const numeroLineas = new Array(5).fill(0);
  const intentos = useAppStore(store => store.intentos);

  return (
    <div className='flex flex-col items-center justify-center gap-2'>
        {numeroLineas.map((_, index) => (
          <InputsLine key={uuid()} lineaActiva={intentos === index}/>
        ))}
    </div>
  )
}
