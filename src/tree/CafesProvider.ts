import { Event, EventEmitter, ProviderResult, TreeDataProvider, TreeItem } from 'vscode'
import { CityItem } from './CityItem'
import { CafeItem } from './CafeItem'
import { PropertyItem } from './PropertyItem'
import * as raw from '../data.json'
import { CafeShop } from '../types'
import { parseShop } from '../utils/parseShop'
import { ColorToIcon } from '../constants'

export class CafesProvider implements TreeDataProvider<CityItem> {
  private _onDidChangeTreeData: EventEmitter<CityItem | undefined | void> = new EventEmitter<
    CityItem | undefined | void
  >()
  readonly onDidChangeTreeData: Event<CityItem | undefined | void> = this._onDidChangeTreeData.event

  private allCities: any[] = []

  constructor() {
    this.allCities = Object.entries(raw)
  }

  getTreeItem(element: CityItem): TreeItem | Thenable<TreeItem> {
    return element
  }

  getChildren(
    element?: CityItem | CafeItem
  ): ProviderResult<CityItem[] | CafeItem[] | PropertyItem[]> {
    if (element) {
      if (element instanceof CityItem) {
        return this.getCafeItems(element.originalData)
      } else if (element instanceof CafeItem) {
        return this.getPropertyItems(element.cafe)
      }
    } else {
      return this.getCityItems()
    }
  }

  getCityItems(): CityItem[] {
    return this.allCities.map(([k, v]) => {
      const label = `${v.name}(${v.count})`
      return new CityItem(label, k, v)
    })
  }

  getCafeItems(originalData: any): CafeItem[] {
    const cafes = originalData.data.features.map((i: any) => {
      const cafe = {
        ...i,
        coordinates: i.geometry.coordinates
      } as CafeShop
      return parseShop(cafe)
    })
    return cafes.map((i: any) => new CafeItem(i.name, i, ColorToIcon[i.color]))
  }

  getPropertyItems(cafe: any) {
    return cafe.table.map(([k, v]: any) => new PropertyItem(`${k}：${v}`))
  }
}
