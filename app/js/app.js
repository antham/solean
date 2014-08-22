'use strict';



angular.module('solean').
  config(function(soleanConfigProvider){
    soleanConfigProvider.config.welcomeMessage = 'Welcome on this angularjs console demo';
    soleanConfigProvider.config.promptLabel = 'root@localhost > ';
    soleanConfigProvider.config.handleCommand = function(command) {
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
