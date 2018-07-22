var FolderZip = require('folder-zip');

var options = {
	excludeParentFolder: true, //Default : false. if true, the content will be zipped excluding parent folder.
	// parentFolderName: 'v1.0' //if specified, the content will be zipped, within the 'v1.0' folder
};
var zip = new FolderZip();

zip.zipFolder('./public', options, function(){
	zip.writeToFile('./zip/html-safetypay-spain.zip');
});
