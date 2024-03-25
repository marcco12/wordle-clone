import { InputsLine } from '.';
import {v4 as uuid} from 'uuid';

export const InputsGrid = () => {

  const numeroLineas = new Array(5).fill(0);

  return (
    <div className='flex flex-col items-center justify-center gap-2'>
        {numeroLineas.map((_, index) => (
          <InputsLine key={uuid()} idLinea={index}/>
        ))}
    </div>
  )
}
