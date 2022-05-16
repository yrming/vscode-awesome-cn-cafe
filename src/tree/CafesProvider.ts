import { Event, EventEmitter, ProviderResult, TreeDataProvider, TreeItem } from 'vscode'
import { CityItem } from './CityItem'
import { CafeItem } from './CafeItem'
import * as raw from '../data.json'
import { CafeShop } from '../types'
import { parseShop } from '../utils/parseShop'

export class CafesProvider implements TreeDataProvider<CityItem> {
  private _onDidChangeTreeData: EventEmitter<CityItem | undefined | void> = new EventEmitter<
    CityItem | undefined | void
  >()
  readonly onDidChangeTreeData: Event<CityItem | undefined | void> = this._onDidChangeTreeData.event

  private allCities: any[] = []
  private geo: any
  private cafes: CafeShop[] = []

  constructor() {
    this.allCities = Object.entries(raw)
    this.geo = Object.freeze({
      type: 'FeatureCollection',
      features: Object.values(raw).flatMap((i) => i.data.features as any[])
    })
    this.cafes = Object.freeze(
      this.geo.features.map(
        (i: any) =>
          ({
            ...i,
            coordinates: i.geometry.coordinates
          } as CafeShop)
      )
    )
  }

  getTreeItem(element: CityItem): TreeItem | Thenable<TreeItem> {
    return element
  }

  getChildren(element?: CityItem): ProviderResult<CityItem[] | CafeItem[]> {
    if (element) {
      if (element instanceof CityItem) {
        return this.getCafesByCity(element.city!)
      }
    } else {
      return this.getCityItems()
    }
  }

  getCityItems(): CityItem[] {
    return this.allCities.map(([k, v]) => {
      const label = `${v.name}(${v.count})`
      return new CityItem(label, k)
    })
  }

  getCafesByCity(city: string): CafeItem[] {
    const info = this.allCities.find(([k, v]) => k === city)
    const cafes = info[1].data.features.map((i: any) => {
      const cafe = {
        ...i,
        coordinates: i.geometry.coordinates
      } as CafeShop
      return parseShop(cafe)
    })
    return cafes.map((i: any) => new CafeItem(i.name))
  }
}
