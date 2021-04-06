import cheerio from "cheerio"
import selectors from "./selectors"
import { at } from "./util"

import type { SearchListItem } from "../types/parse"

const trim = (s: string) => s.replace(/\s{2,}|\n/g, " ").replace(/^\s|\s$/g, "")
const parsePrice = (s: string) => (s.match(/^-\.-+$/) ? null : parseFloat(s))
const detailHrefToID = (s: string) => at(s.split("/"), -1)

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
        id: parseInt(detailHrefToID(el.attr("href") || "") || ""),
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
