'use strict';

/* Directives */


angular.module('angularjsConsole.directives', [])
  .directive('angularjsConsoleTerminal', ['config', function(config) {
    return {
      restrict: 'AEC',
      template:
        '<div class="angularjs-console-command-block" ng-repeat="command in commands track by $index">' +
        '<span class="angularjs-console-prompt-label">{{ promptLabel }}</span>' +
        '<span class="angularjs-console-command" ng-if="!$last">{{ command }}</span>' +
        '<span ng-if="$last" class="angularjs-console-prompt">{{currentCommand}}</span>' +
        '<span ng-if="$last" class="angularjs-console-cursor" ng-init="scrollDown();">&nbsp;</span>' +
        '</div>' +
        '<textarea style="position:fixed;left:-9999px;" ng-keyup="handleInput($event);" ng-model="currentCommand" class="angularjs-console-typer" ng-trim="false"></textarea>',
      link: function link(scope, element) {
        scope.promptLabel = config.promptLabel;

        scope.commands = [''];

        scope.handleInput = function(event) {
          if(event.keyCode === config.mapping.carriageReturn) {
            recordCurrentCommand();
            newCommand();
          }
        };

        scope.scrollDown = function() {
          element[0].scrollTop = element[0].scrollHeight;
        };

        var recordCurrentCommand = function() {
          scope.commands[scope.commands.length - 1] = scope.currentCommand;
          scope.currentCommand = '';
        };

        var newCommand = function() {
          scope.commands.push('');
        };

        element.on('click', function() {
          element.find('textarea')[0].focus();
        });
      }
    };
  }]);
