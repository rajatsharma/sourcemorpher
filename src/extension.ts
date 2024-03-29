import * as vscode from "vscode";

import applyTransform from "./utils/applyTransform";

import sortSpecifiedImports from "./transforms/sortSpecifiedImports";

export function activate(context: vscode.ExtensionContext): void {
  const disposable = vscode.commands.registerCommand(
    "sourcemorpher.sortSpecifiedImports",
    async () => {
      await applyTransform(sortSpecifiedImports);
      vscode.window.showInformationMessage("Done 🎉");
    }
  );

  context.subscriptions.push(disposable);
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function deactivate(): void {}
