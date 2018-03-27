/*
 * Copyright (c) 2018, Changwoo Chung
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 3. Neither the name of the Institute nor the names of its contributors
 *    may be used to endorse or promote products derived from this software
 *    without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE INSTITUTE AND CONTRIBUTORS ``AS IS'' AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED.  IN NO EVENT SHALL THE INSTITUTE OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS
 * OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
 * OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
 * SUCH DAMAGE.
 */

var express = require('express');
var async = require('async');
var docgen = require('./docgen.js');
var asana = require('./asanaAPI.js');
var app = express();
global.who = null;
global.docFilePath = null
app.get('/CW', function (req, res) {
  // Async waterfall test.. it might not work as a proper way
  global.who = "CW";
  async.waterfall([

    // Get tasks to be done in a week.
    // Get tasks which are supposed to be done last week.
    // Does not matter if it's status is done or undone.
    asana.taskAPI,
/*
    This will never user again;
    // asana.thisWeekAll,
 */
    // Generate actual word 2007 file (it may be a legacy version, but still works O.K.)
    docgen.gen,
    ],

    // when all the query from 'asana.com' done via api, generate doc file.
    function(err, result) {
      if(err) {
        console.log(err);
      }
      res.download(global.docFilePath);
    });
});
app.get('/NP', function (req, res) {
  // Async waterfall test.. it might not work as a proper way
  global.who = "NP";
  async.waterfall([

    // Get tasks to be done in a week.
    // Get tasks which are supposed to be done last week.
    // Does not matter if it's status is done or undone.
    asana.taskAPI,
/*
    This will never user again;
    // asana.thisWeekAll,
 */
    // Generate actual word 2007 file (it may be a legacy version, but still works O.K.)
    docgen.gen,
    ],

    // when all the query from 'asana.com' done via api, generate doc file.
    function(err, result) {
      if(err) {
        console.log(err);
      }
      res.download(global.docFilePath);
    });
});

app.use(express.static('tmp'));

app.listen(8001, function () {
  console.log('Asana app listening on port 8001!');
});
