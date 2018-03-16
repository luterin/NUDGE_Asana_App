module.exports.taskAPI = function(callback){
  var Asana = require('asana');
  var util = require('util');
  var userAccessToken = (who == 'CW' ? '0/aca9749ae819383d232bc2c3ffc81ff7'  : 'TODO: constant');
  var client = Asana.Client.create().useAccessToken(userAccessToken);
  client.users.me()
    .then(function(user) {
      var userId = user.id;
      var workspaceId = "588624289895326";
      var projectId = "591181310201199";
      return client.tasks.findAll({
        assignee: userId,
        workspace: workspaceId,
        projects: projectId,
        opt_fields: 'id,name,assignee,assignee_status,completed,notes,due_on'
      });
    })
    .then(function(response) {
      return response.data;
    })
/*  Filter off.. tasks will be filterd at "docgen.js"
    .filter(function(task) {
      return task.assignee_status === 'upcoming';
    })
 */
    .then(function(list) {
      return list;
    }).then(function(allJob){
      console.log("asanaAPI callback test :" + allJob);
      callback(null, allJob);
    });

};
/* algorithm has changed. Not gonna use it for a while.
module.exports.thisWeekAll = function(lastList, callback){
  var Asana = require('asana');
  var util = require('util');
  var client = Asana.Client.create().useAccessToken('0/aca9749ae819383d232bc2c3ffc81ff7');
  client.users.me()
    .then(function(user) {
      var userId = user.id;
      var workspaceId = user.workspaces[0].id;
      return client.tasks.findAll({
        assignee: userId,
        workspace: workspaceId,
        opt_fields: 'id,name,assignee_status,completed,notes'

      });
    })
    .then(function(response) {
      return response.data;
    })
    .filter(function(task) {
      return task.completed === 'true';
    })
    .then(function(list) {
      return list;
    }).then(function(thisList){
      console.log("asanaAPI callback test2 :" + thisList);
      callback(null, lastList, thisList);
    });
};
*/
