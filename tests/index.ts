import test, { ExecutionContext } from "ava"

import CleverTanken from "../src"
import { FuelTypes } from "../types/fuelTypes"
import { SearchListItem } from "../types/parse"

const { lat, lng } = { lat: 52.518583, lng: 13.401709 }

const testStation = (t: ExecutionContext<unknown>, station: SearchListItem) => {
  t.truthy(station.city)
  t.truthy(station.detailHref)
  t.truthy(station.dist)
  t.truthy(station.id)
  t.truthy(station.name)
  t.truthy(station.street)
  t.truthy(station.additional)
  t.assert(station.price === null || station.price)
}

test("test for e5 in berlin", async t => {
  const ct = new CleverTanken()

  const data = await ct.radialSearch({
    lat,
    lng,
    type: FuelTypes["Super E5"],
  })

  const [station] = data

  t.truthy(data.length)
  testStation(t, station)
})

test("test for e5 in berlin with given radius", async t => {
  const ct = new CleverTanken()

  const data = await ct.radialSearch({
    lat,
    lng,
    rad: 10,
    type: FuelTypes["Super E5"],
  })

  const [station] = data

  t.truthy(data.length)
  testStation(t, station)
})
