/* eslint-disable @typescript-eslint/naming-convention */
import * as path from 'path'

export const ColorToIcon: Record<string, string> = {
  '#50C240': path.join(__filename, '../../resources/wifi-strength-4.svg'),
  '#F3AE1A': path.join(__filename, '../../resources/wifi-strength-2.svg'),
  '#C24740': path.join(__filename, '../../resources/wifi-strength-1.svg'),
  '#BEBEBE': path.join(__filename, '../../resources/domain-off.svg')
}

export const Colors = Object.keys(ColorToIcon)

export const ignoredProperties = [
  '名称',
  '下载速度',
  'shortname',
  'Speedtest 链接',
  'marker-color',
  'marker-symbol',
  'referrers'
]
