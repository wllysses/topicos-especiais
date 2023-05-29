export interface VehicleProps {
    codigo: string
    nome: string
}

export interface VehicleModelProps {
    modelos: VehicleProps[]
}

export interface VehicleDataProps {
    MesReferencia: string
    Modelo: string
    Marca: string
    Valor: string
    AnoModelo: number
}