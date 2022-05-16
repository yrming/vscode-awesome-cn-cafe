import * as raw from './data.json'

export interface CafeShop {
  coordinates: [number, number]
  properties: Record<string, string>
}

export type Cities = keyof typeof raw
