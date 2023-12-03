// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const os=require('os')

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Congratulations, your extension "ts-watcher" is now active!');


	let disposable = vscode.commands.registerCommand('ts-watcher.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from ts-watcher!');
	});

	vscode.workspace.onDidSaveTextDocument(
		()=>{

			//check if typescript is  installed globaly 

				// 	if npm ls -g typescript | grep -q 'typescript@'; then
				// 	echo "good"
				//   fi

			//check os 
			console.log("platform name : "+os.platform())

			//get current file name
			console.log(' current text document  : '+vscode.window.activeTextEditor.document.fileName.split("/").at(-1).trim()

			)
			
			//scan project tree for package json and look for the props out dir and get its value 
			
			//implement command  based on operating system 
			//
			console.log('terminal list length :'+vscode.window.terminals.length)
			console.log('active teminal name :'+ vscode.window.activeTerminal.name)
			vscode.window.activeTerminal.sendText('tsc app.ts')
			vscode.window.activeTerminal.sendText('node app.js').
			vscode.window.showInformationMessage('on save event ts-watcher! ');
			console.log('test final')
			
		}
	)

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
