'use strict';


// Declare app level module which depends on filters, and services
angular.module('angularjsConsole', [
  'angularjsConsole.directives'
])
  .value('config',{
    'mapping':{
      'carriageReturn': 13
    },
    'promptLabel': 'root@localhost > ',
    'welcomeMessage': 'Welcome on this angularjs console demo'
  });
