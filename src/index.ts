import type { RadialSearchArg } from "../types/index.d"
import type { RadialSearchParams } from "../types/API"
import type { SearchListItem } from "../types/parse"

import got from "got"
import parse from "./parse"

export default class CleverTanken {
  private baseURL = "https://clever-tanken.de"

  radialSearch = async (opt: RadialSearchArg): Promise<SearchListItem[]> => {
    const searchParams: RadialSearchParams = {
      lat: opt.lat,
      lon: opt.lng,
      spritsorte: opt.type,
      r: opt.rad ?? 5,
    }

    const url = this.baseURL + "/tankstelle_liste"
    const response = await got(url, { searchParams })

    return parse.searchList(response.body)
  }
}
