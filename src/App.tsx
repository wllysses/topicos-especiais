import { FormEvent, useEffect, useState } from "react"
import { api } from "./services/api"
import { Modal } from "./components/Modal"
import { VehicleProps, VehicleModelProps, VehicleDataProps } from './interfaces'

const App = () => {

  const [vehicleType, setVehicleType] = useState('')
  const [vehicleCode, setVehicleCode] = useState('')
  const [vehicleModelCode, setVehicleModelCode] = useState('')
  const [vehicleYear, setVehicleYear] = useState('')
  const [vehicleBrands, setVehicleBrands] = useState<VehicleProps[]>([])
  const [vehicleModel, setVehicleModel] = useState({} as VehicleModelProps)
  const [vehicleYearAndFuel, setVehicleYearAndFuel] = useState<VehicleProps[]>([])
  const [vehicleData, setVehicleData] = useState({} as VehicleDataProps)

  const [isOpen, setIsOpen] = useState(false)


  useEffect(() => {
    vehicleType && api.get(`/${vehicleType}/marcas`).then(resp => setVehicleBrands(resp.data))
  }, [vehicleType])

  useEffect(() => {
    vehicleCode && api.get(`/${vehicleType}/marcas/${vehicleCode}/modelos`).then(resp => setVehicleModel(resp.data))
  }, [vehicleCode])

  useEffect(() => {
    vehicleModelCode && api.get(`/${vehicleType}/marcas/${vehicleCode}/modelos/${vehicleModelCode}/anos`).then(resp => setVehicleYearAndFuel(resp.data))
  }, [vehicleModelCode])


  const fetchVehicleFullData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    api
    .get(`/${vehicleType}/marcas/${vehicleCode}/modelos/${vehicleModelCode}/anos/${vehicleYear}`)
    .then(resp => setVehicleData(resp.data))
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
              vehicleBrands &&
              vehicleBrands.map((vehicle) => (
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
              vehicleModel.modelos &&
              vehicleModel.modelos.map((vehicle) => (
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
              vehicleYearAndFuel &&
              vehicleYearAndFuel.map((vehicle) => (
                <option key={vehicle.codigo} value={vehicle.codigo}>{vehicle.nome}</option>
              ))
            }
          </select>
        </div>

        <button className="font-bebas bg-primary-color p-2 rounded text-white text-lg" disabled={!vehicleYear}>Consultar</button>
      </form>

      <Modal data={vehicleData} open={isOpen} handleOpenModal={setIsOpen} />
    </main>
  )
}

export default App
