// The module 'vscode' contains the VS Code extensibility API

import { create } from 'domain';

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


		//check os 
		// create a new terminal depaning on the platform check above idealy  to avoid collision with user terminal 
		const targetPlatform=os.platform()
		console.log("platform name : "+os.platform())
		
		switch (targetPlatform) {
			case 'darwin':
				// create zsh terminal instance 
				console.log(" im on mac ")
				break;
			case 'linux':
			// create bash terminal instance 
				break;
			case 'win32':
				// create cmd terminal instance 
				break;
			default:
				break;
		}



		//check if typescript is  installed globaly 

			// 	if npm ls -g typescript | grep -q 'typescript@'; then
			// 	echo "good"
			//   fi

		//if not show a popUp that tells the user to install typescript  globaly by running npm i -g typescript 
		// and reactivate the extention 


		//check for .vscode folder and for settings.json file 
		//parse settings.json file looking for the exclude snippet if it does not exist 
		//insert the exclude .js and .js map snippet and save document


	vscode.workspace.onDidSaveTextDocument(

		()=>{

			var currentFileName=vscode.window.activeTextEditor.document.fileName.split("/").at(-1).trim()
			var targetFileName=currentFileName.replace('.ts','.js')


		
			// check if the saved file is a ts file 
			if(currentFileName.endsWith('.ts')){
			
			
			//scan project tree for package json and look for the props out dir and get its value 
			
			//implement command  based on operating system 
			//
			console.log('terminal list length :'+vscode.window.terminals.length)
			console.log('active teminal name :'+ vscode.window.activeTerminal.name)
			vscode.window.activeTerminal.sendText(`tsc ${currentFileName}`)
			vscode.window.activeTerminal.sendText(`node ${targetFileName}`)
			vscode.window.showInformationMessage('on save event ts-watcher! ');
			console.log('test final')

			}

			
			
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
