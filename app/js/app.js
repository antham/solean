'use strict';


// Declare app level module which depends on filters, and services
angular.module('angularjsConsole', [
  'angularjsConsole.directives'
])
  .value('config',{
    'mapping':{
      'moveBackward': 37,
      'moveForward': 39,
      'carriageReturn': 13
    },
    'promptLabel': 'root@localhost > ',
    'welcomeMessage': 'Welcome on this angularjs console demo',
    'handleCommand': function(command) {

      if(command['command'] === 'foo')
      {
        command['valid'] = {'message':'Correct !','code':'complete'};
      }
      else
      {
        command['invalid'] = {'message':'Wrong !','code':'warning'};
      }

      return command;
    }
  });
