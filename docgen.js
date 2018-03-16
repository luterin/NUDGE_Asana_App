module.exports.gen = function(allJob, callback){

  var async = require ( 'async' );
  var officegen = require('officegen');
  var dates = require('date-utils');
  var fs = require('fs');
  var path = require('path');
/* Variables for reports
 * Hard coded Because I'm so damn lazy
 */
  var filePath;
  var groupName = " 장  건,  정  창 우";
  var taskNum = Object.keys(allJob).length;
  var lastWeek = [], thisWeek = [];
  var lastNum = 0;
  var thisNum = 0;
  var name = (allJob[0].assignee.id == 588624251133509) ? "정  창 우" :  "장  건";
  var today = new Date();

  function getWeekNum() {
    var refDate = new Date(2018, 2, 12, 0, 0, 0, 0);
    var diffDate = (today.getTime() - refDate.getTime()) / (1000*60*60*24);
    return (Math.floor(diffDate / 7) + 1);
  }

  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}
  var docx = officegen ({
  	type: 'docx',
  	orientation: 'portrait',
  	pageMargins: { top: 1000, left: 1000, bottom: 1000, right: 1000 }
  });


  docx.on ( 'error', function ( err ) {
  			console.log ( err );
  		});
  for (x = 0; x < taskNum; x++) {
      if( (new Date(allJob[x].due_on) < today) && allJob[x].name != '' ) {
        lastWeek[lastNum] = allJob[x];
        lastNum++;
      }
      else if( (new Date(allJob[x].due_on) > today) && allJob[x].name != '') {
        thisWeek[thisNum] = allJob[x];
        thisNum++;
      }
      else {
        console.log("docgen: Task Filter error! Maybe there are abnormal state tasks" );
      }
  }
  var pObj = docx.createP ();
  pObj.addText ( 'Convergence Project Progress Report Form' , { font_face: 'Arial', font_size: 16 });
  pObj.addLineBreak ();
  pObj.addText ( '(Weekly log will be counted as 20% in the final grade)', { font_face: 'Arial', font_size: 16 });
  var pObj = docx.createP ();
  pObj.addLineBreak ();

  pObj.addText ( 'Meeting Date : ' + formatDate(today) + '            Week Number : ' + getWeekNum(), { font_face: 'Arial', font_size: 10 });
  var pObj = docx.createP ();
  pObj.addText ( 'Name :    ' + name, { font_face: 'Arial', font_size: 10 });
  var pObj = docx.createP ();
  pObj.addText ( 'Group Members : ' + groupName, { font_face: 'Arial', font_size: 10 });
  var pObj = docx.createP ();
  pObj.addLineBreak ();
  pObj.addText ( 'My PERSONAL contribution to the project in the last week was:', { font_face: 'Arial', font_size: 10 });

  // Generate Last week's tasks
  // Details at README.md
  for(i=0; i < lastNum; i++) {
    var pObj = docx.createP ();
    pObj.addText (" " + lastWeek[i].name, { font_face: 'Arial', font_size: 12, bold: true});
    pObj.addLineBreak ();
    var tmp = lastWeek[i].notes.split('\n');
    for (j = 0; j < tmp.length ; j++) {
      //console.log(tmp[j]);
      pObj.addText (" " + tmp[j], { font_face: 'Arial', font_size: 10 });
      pObj.addLineBreak ();
    }
    pObj.addText (" Due Date:" + lastWeek[i].due_on, { font_face: 'Arial', font_size: 7, bold: true });
    pObj.addLineBreak ();
    if(thisWeek[i].completed == false) {
      pObj.addText (" Is Completed:" + lastWeek[i].completed, { font_face: 'Arial', font_size: 7, bold: true, color: 'ff0000'});
      pObj.addLineBreak ();
    }
    else {
      pObj.addText (" Is Completed:" + lastWeek[i].completed, { font_face: 'Arial', font_size: 7, bold: true});
      pObj.addLineBreak ();
    }
  }
  // Generate Last week's tasks
  // Details at README.md
  var pObj = docx.createP ();
  pObj.addText ( '  My PERSONAL contribution to the project next week will be to:', { font_face: 'Arial', font_size: 10 });
  pObj.addLineBreak ();
  pObj.addLineBreak ();

  for(i=0; i < thisNum; i++) {
    pObj.addText (" " + thisWeek[i].name, { font_face: 'Arial', font_size: 12, bold: true});
    pObj.addLineBreak ();
    var tmp = thisWeek[i].notes.split('\n');
    for (j = 0; j < tmp.length ; j++) {
      //console.log(tmp[j]);
      pObj.addText (" " + tmp[j], { font_face: 'Arial', font_size: 10 });
      pObj.addLineBreak ();
    }
    pObj.addText (" Due Date:" + thisWeek[i].due_on, { font_face: 'Arial', font_size: 7, bold: true });
    pObj.addLineBreak ();
    if(thisWeek[i].completed == false) {
      pObj.addText (" Is Completed:" + thisWeek[i].completed, { font_face: 'Arial', font_size: 7, bold: true, color: 'ff0000'});
      pObj.addLineBreak ();
    }
    else {
      pObj.addText (" Is Completed:" + thisWeek[i].completed, { font_face: 'Arial', font_size: 7, bold: true});
      pObj.addLineBreak ();
    }
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
