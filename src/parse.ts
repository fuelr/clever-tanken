import cheerio from "cheerio"
import { SEARCH } from "./selectors"
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
    const items = $(SEARCH.SEARCH_LIST_ITEM).toArray()

    return items.map(element => {
      const el = $(element)
      const get = (sel: string) => trim(el.find(sel).text())

      el.find(SEARCH.ADDITIONAL).find("br").replaceWith("\n")

      return {
        city: get(SEARCH.CITY),
        detailHref: el.attr("href"),
        dist: parseFloat(get(SEARCH.DIST)),
        id: parseInt(
          detailHrefToID(
            el.attr("href") /* istanbul ignore next */ || ""
          ) /* istanbul ignore next */ || ""
        ),
        name: get(SEARCH.NAME),
        price: parsePrice(get(SEARCH.PRICE)),
        street: get(SEARCH.STREET),
        additional: el
          .find(SEARCH.ADDITIONAL)
          .toArray()
          .map(e => trim($(e).text()))
          .reduce((p, c) => `${p} ${c}`),
      }
    })
  },
}
