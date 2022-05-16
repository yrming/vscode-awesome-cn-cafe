import { ExtensionContext, window } from 'vscode'
import { CafesProvider } from './CafesProvider'

export async function registerTrees(context: ExtensionContext): Promise<void> {
  const cafesProvider = new CafesProvider()
  window.registerTreeDataProvider('awesomeCNCafe.cafes', cafesProvider)
}
