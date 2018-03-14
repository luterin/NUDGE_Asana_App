module.exports.lastWeek = function(callback){
  var Asana = require('asana');
  var util = require('util');
  var client = Asana.Client.create().useAccessToken('0/aca9749ae819383d232bc2c3ffc81ff7');
  client.users.me()
    .then(function(user) {
      var userId = user.id;
      var workspaceId = user.workspaces[0].id;
      console.log("asanaAPI: work on last week!");
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
      return task.assignee_status === 'upcoming' ||
        task.assignee_status === 'new';
    })
    .then(function(list) {
      console.log(util.inspect(list, {
        colors: true,
        depth: null
      }));
      return list;
    }).then(function(lastList){
      console.log("asanaAPI callback test 1:" + lastList);
      callback(null, lastList);
    });

};

module.exports.thisWeek = function(lastList, callback){
  var Asana = require('asana');
  var util = require('util');
  var client = Asana.Client.create().useAccessToken('0/aca9749ae819383d232bc2c3ffc81ff7');
  client.users.me()
    .then(function(user) {
      var userId = user.id;
      var workspaceId = user.workspaces[0].id;
      console.log("asanaAPI: work on this week!");
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
      return task.completed === 'true'
    })
    .then(function(list) {
      console.log(util.inspect(list, {
        colors: true,
        depth: null
      }));
      return list;
    }).then(function(thisList){
      console.log("asanaAPI callback test2 :" + thisList);
      callback(null, lastList, thisList);
    });
};
