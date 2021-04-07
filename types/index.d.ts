import { FuelTypes } from "."

export interface RadialSearchArg {
  lat: number
  lng: number
  type: FuelTypes
  rad?: number
}
