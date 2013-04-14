fs = require('fs');
libxmljs = require('libxmljs');

function parseForImport( inputFile, outputFile ) {
	fs.readFile(inputFile, 'utf8', function(err, data) {
		if (err) {
			return console.log(err);
		} else {
			var xmlDoc = libxmljs.parseXmlString(data);
			var resources = xmlDoc.get('//resources');
			var childs = resources.childNodes();

			//Creating new document
			var newDoc = new libxmljs.Document();
			var resourcesNode = newDoc.node('resources');
			resourcesNode.attr('xmlns:xliff', 'urn:oasis:names:tc:xliff:document:1.2');

			for( var i = 0; i < childs.length; i++ ) {
				var value = childs[i].text();
				value = value.replace( /^[\"]?(.*?)[\"]?$/g, "$1" );
				//console.log( childs[i].attr('name').value() + ' -> ' + value );
				childs[i].text(value);
				resourcesNode.addChild( childs[i] );
				//%s -> %1$s
			}

			fs.writeFile( outputFile, newDoc.toString(), function(err) {
				if (err) {
					console.log(err);
				} else {
					console.log("The file was saved!");
				}
			});
		}
	});
}

function parseForExport( inputFile, outputFile ) {
	fs.readFile(inputFile, 'utf8', function(err, data) {
		if (err) {
			return console.log(err);
		} else {
			var xmlDoc = libxmljs.parseXmlString(data);
			var resources = xmlDoc.get('//resources');
			var childs = resources.childNodes();

			//Creating new document
			var newDoc = new libxmljs.Document();
			var resourcesNode = newDoc.node('resources');
			resourcesNode.attr('xmlns:xliff', 'urn:oasis:names:tc:xliff:document:1.2');

			for( var i = 0; i < childs.length; i++ ) {
				if( childs[i] != null && childs[i].attr('name') != null ) {
					if( childs[i].attr('translatable') == null || childs[i].attr('translatable') == 'true' ) {
						resourcesNode.addChild( childs[i] );
					}
				}
			}
			fs.writeFile( outputFile, newDoc.toString(), function(err) {
				if (err) {
					console.log(err);
				} else {
					console.log("The file was saved!");
				}
			});
		}
	});
}


//Examples usage
//parseForImport('./mxm_android_de.xml', './mxm_android_de_out.xml');
parseForExport('./strings.xml', './strings-out.xml');