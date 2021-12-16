const fs = require('fs')
const path = require('path')

/* function to list directory recursively
*	@param:dirPath 
*	returns JSON-object, which contains:
*		{
*			root-dir: 	[
*							children_dir_Array: 	[...],
*							children_files_String	
*						]
*		}
*/

function listDir(dirPath){
	let FileTree = {}
	FileTree[dirPath]=[]
		let root = FileTree[dirPath];
	let files = fs.readdirSync(dirPath) 
		
		files.forEach(file => { 
			let Absolute = path.join(dirPath,file);

		  if (fs.lstatSync(Absolute).isDirectory() ){
		  	let inDir = {};
		  	inDir = listDir(Absolute)
			root.push(inDir);
			
		  } else {
		  	root.push(Absolute);
		  }  
		});
	return FileTree;
}


function allFiles(dirPath){
	let FilesList = [];
	let files = fs.readdirSync(dirPath);
	files.forEach(file=>{
		let Absolute = path.join(dirPath,file);
		if (fs.lstatSync(Absolute).isDirectory() ){
		  	let inDir = allFiles(Absolute);
			FilesList = FilesList.concat(inDir);
		} else {
		  	FilesList.push(Absolute);
		  }  
	});
	return FilesList;
}

function onlyFiles(dirPath){
	let FilesList = [];
	let files = fs.readdirSync(dirPath);
	files.forEach(file=>{
		let Absolute = path.join(dirPath,file);
		if (!fs.lstatSync(Absolute).isDirectory() ){
		  	FilesList.push(Absolute);
		} 
	});
	return FilesList;
}

module.exports = { listDir, allFiles, onlyFiles }

