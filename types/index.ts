export enum FuelTypes {
  "Diesel" = 3,
  "Super E10" = 5,
  "Super E5" = 7,
  "SuperPlus" = 6,
  "Premium Diesel" = 12,
  "LKW-Diesel" = 2,
  "Autogas" = 1,
  "Erdgas" = 8,
  "Bioethanol" = 4,
  "Natural gas (CNG, LNG)" = 262,
  "Wasserstoff" = 246,
  "GTL Diesel" = 264,
  "AdBlue" = 13,
  "AdBlue PKW" = 266,
  "AdBlue (pump)" = 261,
  "LNG" = 273,
}

export interface RadialSearchArg {
  lat: number
  lng: number
  type: FuelTypes
  rad?: number
}
