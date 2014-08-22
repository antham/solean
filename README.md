# Solean

Emulate a custom terminal in a browser in JavaScript with AngularJS, a fork of [jquery-console](https://github.com/chrisdone/jquery-console) project

# Usage

Have a look to app folder which contains a complete example with index html, to see it in action run from the root of this project `npm start` and go to `http://localhost:8000/app` or have a look to live preview on [plunker](http://embed.plnkr.co/3joeTph4ciV2HeduJ8Af/preview)

# Setup

Setup is doing through soleanConfigProvider as follow :


``` javascript
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
```

# Options

| Option                | Type     | Description
| -----------           | -------- | ------
| welcomeMessage        | string   | A welcome message to display on terminal
| promptLabel           | string   | Text use as prompt label like "root@localhost $ " for instance
| handleCommand         | function | Take a command object as argument, and return same object with a valid/unvalid attribute which contains a message to display and a code which is used to generate a message class


# Testing

Run server with `npm start` and afterwards run test suite with `grunt run-tests`
