module.exports.gen = function(lastWeek, thisWeek, callback){

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

  // Generate Last week's tasks
  // Details at README.md
  for(i=0; i < Object.keys(lastWeek).length - 1; i++) {
    var pObj = docx.createP ();
    pObj.addText (" " + lastWeek[i].name, { font_face: 'Arial', font_size: 12, bold: true});
    pObj.addLineBreak ();
    var tmp = lastWeek[i].notes.split('\n');
    for (j = 0; j < tmp.length ; j++) {
      //console.log(tmp[j]);
      pObj.addText (" " + tmp[j], { font_face: 'Arial', font_size: 10 });
      pObj.addLineBreak ();
    }
  }
  // Generate Last week's tasks
  // Details at README.md
  var pObj = docx.createP ();
  pObj.addText ( '  My PERSONAL contribution to the project next week will be to:', { font_face: 'Arial', font_size: 10 });
  pObj.addLineBreak ();
  pObj.addLineBreak ();

  for(i=0; i < Object.keys(thisWeek).length - 1; i++) {
    pObj.addText (" " + thisWeek[i].name, { font_face: 'Arial', font_size: 12, bold: true});
    pObj.addLineBreak ();
    var tmp = lastWeek[i].notes.split('\n');
    for (j = 0; j < tmp.length ; j++) {
      console.log(tmp[j]);
      pObj.addText (" " + tmp[j], { font_face: 'Arial', font_size: 10 });
      pObj.addLineBreak ();
    }
    pObj.addLineBreak ();
    pObj.addLineBreak ();
  }

  docx.putPageBreak ();

  var out = fs.createWriteStream ( 'tmp/out.docx' );
  filePath = 'tmp/out.docx';
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
    callback(null, filePath);
  });


};
