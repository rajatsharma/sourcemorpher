import * as vscode from 'vscode';

import applyTransform from './utils/applyTransform';

import sortSpecifiedImports from './transforms/sortSpecifiedImports';

export function activate(context: vscode.ExtensionContext): void {
  const disposable = vscode.commands.registerCommand(
    'sourcemorpher.sortSpecifiedImports', async () => {
      await applyTransform(sortSpecifiedImports);
      vscode.window.showInformationMessage('Hello World from sourcemorpher!');
    },
  );

  context.subscriptions.push(disposable);
}

export function deactivate(): void { }
