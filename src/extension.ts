import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.transformUseState",
    () => {
      const editor = vscode.window.activeTextEditor;

      if (!editor) {
        return;
      }

      const document = editor.document;
      const selections = editor.selections;

      editor.edit((editBuilder) => {
        selections.forEach((selection) => {
          const text = document.getText(selection);
					const regex = /const \[(\w+)\s*\]/g;
          const newText = text.replace(regex, (match, p1) => {
						const capitalized = p1.charAt(0).toUpperCase() + p1.slice(1);
						return `const [${p1}, set${capitalized}] = useState();`;
				});

          editBuilder.replace(selection, newText);
        });
      });
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
