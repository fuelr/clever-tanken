import cheerio from "cheerio"
import selectors from "./selectors"
import { at } from "./util"

import type { SearchListItem } from "../types/parse"

export const trim = (s: string): string => s.replace(/\s{2,}|\n/g, " ").replace(/^\s|\s$/g, "")
export const parsePrice = (s: string): number | null => {
  return s.match(/^-\.-+$/) ? null : parseFloat(s)
}
export const detailHrefToID = (s: string): string | null => at(s.split("/"), -1)

export default {
  searchList(html: string): Array<SearchListItem> {
    const $ = cheerio.load(html)
    const items = $(selectors.LIST_ITEMS).toArray()

    return items.map(element => {
      const el = $(element)
      const get = (sel: string) => trim(el.find(sel).text())

      el.find(selectors.ADDITIONAL).find("br").replaceWith("\n")

      return {
        city: get(selectors.CITY),
        detailHref: el.attr("href"),
        dist: parseFloat(get(selectors.DIST)),
        id: parseInt(
          detailHrefToID(
            el.attr("href") /* istanbul ignore next */ || ""
          ) /* istanbul ignore next */ || ""
        ),
        name: get(selectors.NAME),
        price: parsePrice(get(selectors.PRICE)),
        street: get(selectors.STREET),
        additional: el
          .find(selectors.ADDITIONAL)
          .toArray()
          .map(e => trim($(e).text()))
          .reduce((p, c) => `${p} ${c}`),
      }
    })
  },
}
