'use strict';



angular.module('angularjsConsole').
  config(function(angularjsConsoleConfigProvider){
    angularjsConsoleConfigProvider.config.welcomeMessage = 'Welcome on this angularjs console demo';
    angularjsConsoleConfigProvider.config.promptLabel = 'root@localhost > ';
    angularjsConsoleConfigProvider.config.handleCommand = function(command) {
      if(command['command'] === 'foo')
      {
        command['valid'] = {'message':'Correct !','code':'complete'};
      }
      else
      {
        command['invalid'] = {'message':'Wrong !','code':'warning'};
      }

      return command;
    };
  });
