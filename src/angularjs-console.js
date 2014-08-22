'use strict';


angular.module('angularjsConsole', [])
  .provider('angularjsConsoleConfig', function(){
    var config = {
      'mapping':{
        'moveBackward': 37,
        'moveForward': 39,
        'carriageReturn': 13
      },
      'promptLabel': '$ ',
      'welcomeMessage': null,
      'handleCommand': function(command) {
        return command;
      }
    };

    return {
      config: config,
      $get: function() {
        return config;
      }
    }
  })
  .directive('angularjsConsoleTerminal', ['angularjsConsoleConfig', function(config) {
    return {
      restrict: 'AEC',
      scope: true,
      template:
      '<span class="angularjs-console-welcome-message" ng-if="welcomeMessage">{{ welcomeMessage }}</span>' +
        '<div class="angularjs-console-command-block" ng-repeat="command in commands track by $index">' +
        '<div>' +
        '<span class="angularjs-console-prompt-label">{{ promptLabel }}</span>' +
        '<span ng-if="!$last" class="angularjs-console-command">{{ command.command }}</span>' +
        '<span ng-if="$last" class="angularjs-console-command"><span ng-repeat="character in command.command track by $index" ng-class="{\'angularjs-console-cursor\':$index==cursorIndex}">{{ character === " " ? "&nbsp;" : character }}</span></span>' +
        '<span ng-if="$last && cursorIndex === null" class="angularjs-console-cursor" ng-init="scrollDown();">&nbsp;</span>' +
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
        scope.cursorIndex = null;

        var handleCommand = config.handleCommand;

        scope.handleInput = function(event) {
          switch(event.keyCode)
          {
          case config.mapping.carriageReturn:
            normalizeCurrentCommand();
            newCommand();
            break;
          case config.mapping.moveForward:
            moveCursorForward();
            break;
          case config.mapping.moveBackward:
            moveCursorBackward();
            break;
          default:
            followTyping();
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

        var moveCursorForward = function() {
          scope.cursorIndex = scope.cursorIndex !== null && scope.cursorIndex + 1 < element.find('textarea')[0].value.length ? element.find('textarea')[0].selectionStart : null;
        };

        var moveCursorBackward = function() {
          scope.cursorIndex = element.find('textarea')[0].selectionStart;
        };

        var followTyping = function() {
          scope.cursorIndex = scope.cursorIndex !== null ? element.find('textarea')[0].selectionStart : null;
        };

        element.on('click', function() {
          element.find('textarea')[0].focus();
        });

        scope.commands = [];
        newCommand();
      }
    };
  }]);
