import test from "ava"

import { at } from "../src/util"
import { parsePrice } from "../src/parse"

const exampleArray = [0, 1, 2, 3, 4, 5, 6]

test("util.at", t => {
  t.assert(at(exampleArray, 1) === 1)
  t.assert(at(exampleArray, -1) === 6)
  t.assert(at(exampleArray, 7) === null)
})

test("parse.parsePrice", t => {
  t.assert(parsePrice("-.--") === null)
  t.assert(parsePrice("1.234") === 1.234)
})
