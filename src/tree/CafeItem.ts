import { Command, ThemeIcon, TreeItem, TreeItemCollapsibleState } from 'vscode'

export class CafeItem extends TreeItem {
  constructor(
    public readonly label: string,
    public readonly cafe: any,
    public readonly iconPath?: string | ThemeIcon,
    public readonly tooltip?: string,
    public readonly collapsibleState?: TreeItemCollapsibleState,
    public readonly command?: Command
  ) {
    super(label)
    this.collapsibleState = TreeItemCollapsibleState.Collapsed
  }

  contextValue = 'cafe'
}
