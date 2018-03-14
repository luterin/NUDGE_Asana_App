module.exports.doc = function(lastWeek, thisWeek){

  var async = require ( 'async' );
  var officegen = require('officegen');
  var filePath;
  var fs = require('fs');
  var path = require('path');
  var name = "정  창 우";
  var groupName = " 장  건,  정  창 우";


  var docx = officegen ({
  	type: 'docx',
  	orientation: 'portrait',
  	pageMargins: { top: 1000, left: 1000, bottom: 1000, right: 1000 }
  });

  docx.on ( 'error', function ( err ) {
  			console.log ( err );
  		});

  var pObj = docx.createP ();
  pObj.addText ( 'Convergence Project Progress Report Form' , { font_face: 'Arial', font_size: 16 });
  pObj.addLineBreak ();
  pObj.addText ( '(Weekly log will be counted as 20% in the final grade)', { font_face: 'Arial', font_size: 16 });
  var pObj = docx.createP ();
  pObj.addLineBreak ();

  pObj.addText ( 'Meeting Date :                Week Number : ', { font_face: 'Arial', font_size: 10 });
  var pObj = docx.createP ();
  pObj.addText ( 'Name :    ' + name, { font_face: 'Arial', font_size: 10 });
  var pObj = docx.createP ();
  pObj.addText ( 'Group Members : ' + groupName, { font_face: 'Arial', font_size: 10 });
  var pObj = docx.createP ();
  pObj.addLineBreak ();
  pObj.addText ( 'My PERSONAL contribution to the project in the last week was:', { font_face: 'Arial', font_size: 10 });

  docx.putPageBreak ();

  var out = fs.createWriteStream ( 'tmp/out.docx' );

  out.on ( 'error', function ( err ) {
  	console.log ( err );
  });

  async.parallel ([
  	function ( done ) {
  		out.on ( 'close', function () {
  			console.log ( 'Finish to create a DOCX file.' );
  			done ( null );
  		});
  		docx.generate ( out );
  	}

  ], function ( err ) {
  	if ( err ) {
  		console.log ( 'error: ' + err );
  	} // Endif.
  });

  return filePath;
};
