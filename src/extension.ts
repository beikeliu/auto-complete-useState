import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.useStateGenerator",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      // 弹出输入框让用户输入变量名
      vscode.window.showInputBox({ prompt: "请输入变量名" }).then((value) => {
        if (!value) {return;} // 如果用户没有输入，直接返回

        const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
        const useStateCode = `const [${value}, set${capitalizedValue}] = useState();`;

        // 获取当前编辑器的光标位置
        const position = editor.selection.active;

        // 在当前光标位置插入useState代码
        editor.edit((editBuilder) => {
          editBuilder.insert(position, useStateCode);
        });
      });
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
