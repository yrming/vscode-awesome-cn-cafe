import { CafeShop } from '../types'
import { ignoredProperties } from '../constants'

export const parseShop = (shop: CafeShop) => {
  const { properties, coordinates } = shop

  const location1 = coordinates.join(',')
  const location2 = coordinates.slice().reverse().join(',')

  const table = Object.entries(properties).filter(([k]) => !ignoredProperties.includes(k))

  return {
    shop,
    properties,
    coordinates,
    color: properties['marker-color'],
    name: properties['名称'],
    speed: properties['下载速度'],
    speedtest: properties['Speedtest 链接'],
    referrers: properties.referrers as any as string[],
    location1,
    location2,
    table
  }
}
