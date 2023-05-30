import { Dispatch, SetStateAction } from "react"
import { VehicleDataProps } from "../../interfaces"
import { SpinnerLoading } from "../Spinner"

interface Props {
    data: VehicleDataProps
    open: boolean
    handleOpenModal: Dispatch<SetStateAction<boolean>>
}


export const Modal = (props: Props) => {

    return (
        <>
            {
                props.open ?
                    <div className="h-screen w-screen bg-black bg-opacity-20 absolute top-0 left-0 flex items-center justify-center">
                        <div className="bg-white p-4 rounded drop-shadow-2xl max-w-lg w-full -mt-72">
                            {
                                !Object.keys(props.data).length ? <SpinnerLoading /> :
                                    <>
                                        <h2 className="font-bebas text-3xl border-b-2 border-zinc-300">Informações</h2>
                                        <ul className="mt-4 flex flex-col gap-1 pb-10">
                                            <li>
                                                <h3 className="font-bold text-lg">Mês de referência</h3>
                                                <span>{props.data.MesReferencia}</span>
                                            </li>
                                            <li>
                                                <h3 className="font-bold text-lg">Modelo</h3>
                                                <span>{props.data.Modelo} {`(${props.data.AnoModelo})`}</span>
                                            </li>
                                            <li>
                                                <h3 className="font-bold text-lg">Marca</h3>
                                                <span>{props.data.Marca}</span>
                                            </li>
                                            <li>
                                                <h3 className="font-bold text-lg">Valor</h3>
                                                <span>{props.data.Valor}</span>
                                            </li>
                                        </ul>
                                        <div className="flex justify-end">
                                            <button className="font-bebas text-white text-lg bg-primary-color w-24 h-8 rounded shadow-2xl" onClick={() => props.handleOpenModal(!props.open)}>Fechar</button>
                                        </div>
                                    </>
                            }
                        </div>
                    </div>

                    : null
            }
        </>
    )
}
