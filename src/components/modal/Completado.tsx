import { palabras } from "@/data/palabras";
import { useAppStore } from "@/store/zustand";

interface Props {
    isOpen: boolean;
	handleClose: () => void;
}

export const Completado = ({isOpen, handleClose}: Props) => {
    const palabra = useAppStore((store) => store.palabra);
	const ronda = useAppStore((store) => store.ronda);
	const definicion = palabras[ronda].definicion;

	return (
		<div className={`
            fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-5
            ${isOpen? "z-50" : "hidden"}
        `}>
			<div className="max-h-full w-1/2 max-w-xl overflow-y-auto sm:rounded-lg bg-white">
				<div className="w-full flex flex-col gap-4 items-center justify-center">
					<div className="my-10 max-w-[400px] mx-14">
						<div className="mb-12">
							<h1 className="mb-6 text-4xl font-extrabold uppercase text-center">
								{palabra}
							</h1>
							<p className="text-gray-600">
								{definicion}
							</p>
						</div>
						<div className="space-y-4">
							<button className="p-2 bg-black rounded-xl text-white w-full font-semibold" onClick={handleClose}>
								Continuar
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
