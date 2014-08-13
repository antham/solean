'use strict';

/* Directives */


angular.module('angularjsConsole.directives', [])
  .directive('angularjsConsoleTerminal', ['config', function(config) {
    return {
      restrict: 'AEC',
      template:
      '<span class="angularjs-console-welcome-message" ng-if="welcomeMessage">{{ welcomeMessage }}</span>' +
        '<div class="angularjs-console-command-block" ng-repeat="command in commands track by $index">' +
        '<div>' +
        '<span class="angularjs-console-prompt-label">{{ promptLabel }}</span>' +
        '<span class="angularjs-console-command">{{ command.command }}</span>' +
        '<span ng-if="$last" class="angularjs-console-cursor" ng-init="scrollDown();">&nbsp;</span>' +
        '</div>' +
        '<div>' +
        '<span ng-if="command.valid" class="angularjs-console-valid-{{ command.valid.code }}">{{ command.valid.message }}</span>' +
        '<span ng-if="command.invalid" class="angularjs-console-invalid-{{ command.invalid.code }}">{{ command.invalid.message }}</span>' +
        '</div>' +
        '</div>' +
        '<textarea style="position:fixed;left:-9999px;" ng-keyup="handleInput($event);" ng-model="commands[commands.length-1].command" class="angularjs-console-typer" ng-trim="false"></textarea>',
      link: function link(scope, element) {
        scope.promptLabel = config.promptLabel;
        scope.welcomeMessage = config.welcomeMessage;
        var handleCommand = config.handleCommand;

        scope.handleInput = function(event) {
          if(event.keyCode === config.mapping.carriageReturn) {
            normalizeCurrentCommand();
            newCommand();
          }
        };

        scope.scrollDown = function() {
          element[0].scrollTop = element[0].scrollHeight;
        };

        var normalizeCurrentCommand = function() {
          var command = scope.commands[scope.commands.length - 1];
          command.command = command.command.replace('\n','');
          if(handleCommand) {
            command = handleCommand(command);
          }
          scope.commands[scope.commands.length - 1] = command;
        };

        var newCommand = function() {
          scope.commands.push({'command':''});
        };

        element.on('click', function() {
          element.find('textarea')[0].focus();
        });

        scope.commands = [];
        newCommand();
      }
    };
  }]);
