// The module 'vscode' contains the VS Code extensibility API


// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const os=require('os')
const fs=require('fs')

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
			vscode.window.createTerminal('driss','/bin/zsh').show()
			
				break;
			case 'linux':
			// create bash terminal instance 
			console.log('im in linux ')
				break;
			case 'win32':
				// create cmd terminal instance 
			vscode.window.createTerminal('driss','C:\\WINDOWS\\system32\\cmd.exe').show()
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
		console.log('listing root dir ')
		console.log(fs.readdirSync('C:\\Users\\HP\\Desktop\\test-extention'))

		fs.readdirSync('C:\\Users\\HP\\Desktop\\test-extention').forEach(i=>{
			if(i === '.vscode'){
				console.log(' found it')

				//vscode.window.activeTerminal.sendText('cd .vscode')

				fs.readdirSync('C:\\Users\\HP\\Desktop\\test-extention\\.vscode').forEach(file=>{
					if(file === 'settings.json'){

						//check if file exclude settings are there 

						console.log('found settings file ')
					}else{

						console.log('i didnt finde settings file')

						vscode.window.activeTerminal.sendText('echo { >> settings.json')
						vscode.window.activeTerminal.sendText('echo   "files.exclude": { >> settings.json')
						vscode.window.activeTerminal.sendText('echo         "**/.git": true, >> settings.json')
						vscode.window.activeTerminal.sendText('echo         "**/.DS_Store": true, >> settings.json')
						vscode.window.activeTerminal.sendText('echo         "**/*.js": true, >> settings.json')
						vscode.window.activeTerminal.sendText('echo         "**/*.js.map": true >> settings.json')
						vscode.window.activeTerminal.sendText('echo         } >> settings.json')
						vscode.window.activeTerminal.sendText('echo  } >> settings.json')
						
						let commandList=['echo { >> settings.json',
						'echo   "files.exclude": { >> settings.json',
						'echo         "**/.git": true, >> settings.json',
						'echo         "**/.DS_Store": true, >> settings.json',
						'echo         "**/*.js": true, >> settings.json',
						'echo         "**/*.js.map": true >> settings.json',
						'echo         } >> settings.json','echo  } >> settings.json']

						//commandList.forEach(c=> vscode.window.activeTerminal.sendText(c))
						
							
					}
				})

			}else{

				
				console.log("im on the else clause that creates the vs code folder")
				vscode.window.activeTerminal.sendText('mkdir .vscode')
				fs.readdirSync('C:\\Users\\HP\\Desktop\\test-extention\\.vscode').forEach(file=>{
					if(file === 'settings.json'){

						//check if file exclude settings are there 

						console.log('found settings file ')
					}else{

						console.log('i didnt finde settings file')

						vscode.window.activeTerminal.sendText('echo { >> settings.json')
						vscode.window.activeTerminal.sendText('echo   "files.exclude": { >> settings.json')
						vscode.window.activeTerminal.sendText('echo         "**/.git": true, >> settings.json')
						vscode.window.activeTerminal.sendText('echo         "**/.DS_Store": true, >> settings.json')
						vscode.window.activeTerminal.sendText('echo         "**/*.js": true, >> settings.json')
						vscode.window.activeTerminal.sendText('echo         "**/*.js.map": true >> settings.json')
						vscode.window.activeTerminal.sendText('echo         } >> settings.json')
						vscode.window.activeTerminal.sendText('echo  } >> settings.json')
						
						let commandList=['echo { >> settings.json',
						'echo   "files.exclude": { >> settings.json',
						'echo         "**/.git": true, >> settings.json',
						'echo         "**/.DS_Store": true, >> settings.json',
						'echo         "**/*.js": true, >> settings.json',
						'echo         "**/*.js.map": true >> settings.json',
						'echo         } >> settings.json','echo  } >> settings.json']

						//commandList.forEach(c=> vscode.window.activeTerminal.sendText(c))
						
							
					}
				})
				
			}
		})

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
