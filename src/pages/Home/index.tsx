import { FormEvent, useState } from "react"
import { useQuery } from "react-query"
import { api } from "../../services/api"
import { Modal } from "../../components/Modal"
import { VehicleDataProps, VehicleModelProps, VehicleProps } from "../../interfaces"


export const Home = () => {

    const [vehicleType, setVehicleType] = useState('')
    const [vehicleCode, setVehicleCode] = useState('')
    const [vehicleModelCode, setVehicleModelCode] = useState('')
    const [vehicleYear, setVehicleYear] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [vehicleData, setVehicleData] = useState({} as VehicleDataProps)


    const vehicleBrands = useQuery<VehicleProps[]>(['vehicleBrands', vehicleType], async () => {
        const response = await api.get(`${vehicleType}/marcas`)
        return await response.data
    }, { enabled: !!vehicleType })

    const vehicleModel = useQuery<VehicleModelProps>(['vehicleModel', vehicleCode], async () => {
        const response = await api.get(`${vehicleType}/marcas/${vehicleCode}/modelos`)
        return await response.data
    }, { enabled: !!vehicleCode })

    const vehicleYearAndFuel = useQuery<VehicleProps[]>(['vehicleYearAndFuel', vehicleModelCode], async () => {
        const response = await api.get(`${vehicleType}/marcas/${vehicleCode}/modelos/${vehicleModelCode}/anos`)
        return await response.data
    }, { enabled: !!vehicleModelCode })


    const fetchVehicleFullData = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        api
        .get(`/${vehicleType}/marcas/${vehicleCode}/modelos/${vehicleModelCode}/anos/${vehicleYear}`)
        .then(resp => setVehicleData(resp.data))
        .catch(err => console.log(`Error: ${err}`))
        setIsOpen(!isOpen)
    }


    return (
        <main className="h-screen w-screen flex flex-col gap-8 items-center justify-center">
            <h1 className="font-bebas font-bold text-8xl text-primary-color">
                FIPE<span className="text-secondary-color">WEB</span>
            </h1>

            <form className="max-w-md w-full flex flex-col gap-4" onSubmit={fetchVehicleFullData}>
                <div className="flex flex-col gap-2">
                    <label className="font-semibold font-source">Tipo de veículo</label>
                    <select
                        className="border-2 border-zinc-300 p-3 rounded bg-gray"
                        onChange={(e) => setVehicleType(e.target.value)}
                    >
                        <option value="">Selecione uma opção</option>
                        <option value="carros">Carros</option>
                        <option value="motos">Motos</option>
                        <option value="caminhoes">Caminhões</option>
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-semibold font-source">Marca do veículo</label>
                    <select
                        className="border-2 border-zinc-300 p-3 rounded bg-gray"
                        onChange={(e) => setVehicleCode(e.target.value)}
                        disabled={!vehicleType}
                    >
                        <option value="">Selecione uma opção</option>
                        {
                            vehicleBrands.data &&
                            vehicleBrands.data.map((vehicle) => (
                                <option key={vehicle.codigo} value={vehicle.codigo}>{vehicle.nome}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-semibold font-source">Modelo do veículo</label>
                    <select
                        className="border-2 border-zinc-300 p-3 rounded bg-gray"
                        onChange={(e) => setVehicleModelCode(e.target.value)}
                        disabled={!vehicleCode}
                    >
                        <option value="">Selecione uma opção</option>
                        {
                            vehicleModel.data?.modelos &&
                            vehicleModel.data?.modelos.map((vehicle) => (
                                <option key={vehicle.codigo} value={vehicle.codigo}>{vehicle.nome}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-semibold font-source">Ano do veículo</label>
                    <select
                        className="border-2 border-zinc-300 p-3 rounded bg-gray"
                        onChange={(e) => setVehicleYear(e.target.value)}
                        disabled={!vehicleModelCode}
                    >
                        <option value="">Selecione uma opção</option>
                        {
                            vehicleYearAndFuel.data &&
                            vehicleYearAndFuel.data.map((vehicle) => (
                                <option key={vehicle.codigo} value={vehicle.codigo}>{vehicle.nome}</option>
                            ))
                        }
                    </select>
                </div>

                <button className="font-bebas bg-primary-color p-2 rounded text-white text-xl" disabled={!vehicleYear}>Consultar</button>
            </form>

            <Modal data={vehicleData} open={isOpen} handleOpenModal={setIsOpen} />
        </main>
    )
}
