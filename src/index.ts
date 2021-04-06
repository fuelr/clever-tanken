import { RadialSearchArg, FuelTypes } from "../types/index"
import { RadialSearchParams } from "../types/API"

import got from "got"

export default class CleverTanken {
  private baseURL = "https://clever-tanken.de"

  radialSearch = async ({
    lat,
    lng: lon,
    type: spritsorte,
    rad: r = 5,
  }: RadialSearchArg): Promise<any> => {
    const searchParams: RadialSearchParams = { lat, lon, r, spritsorte }

    const response = await got(this.baseURL + "/tankstelle_liste", {
      searchParams,
    })

    return response.body
  }
}

!(async () => {
  const ct = new CleverTanken()
  // const data = await ct.radialSearch({
  //   lat: 52.835448,
  //   lng: 13.813223,
  //   type: FuelTypes["Super E5"],
  // })

  // console.log(data)
})()
