import * as vscode from 'vscode'
import { registerTrees } from './tree/registerTrees'

export function activate(context: vscode.ExtensionContext) {
  registerTrees(context)
}

export function deactivate() {}
