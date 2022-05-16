import { Command, ThemeIcon, TreeItem, TreeItemCollapsibleState } from 'vscode'

export class CityItem extends TreeItem {
  constructor(
    public readonly label: string,
    public readonly city?: string,
    public readonly tooltip?: string,
    public readonly collapsibleState?: TreeItemCollapsibleState,
    public readonly iconPath?: string | ThemeIcon,
    public readonly command?: Command
  ) {
    super(label)
    this.collapsibleState = TreeItemCollapsibleState.Collapsed
  }

  contextValue = 'city'
}
