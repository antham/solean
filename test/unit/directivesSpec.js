'use strict';

/* jasmine specs for directives go here */

describe('directives', function() {

  var $scope = null;
  var element = null;

  beforeEach(module('angularjsConsole.directives',function($provide) {
    $provide.value('config', {'promptLabel': 'root@localhost : '});
  }));

  beforeEach(inject(function($compile, $rootScope){
    element = angular.element('<angularjs-console-terminal></angularjs-console-terminal>');
    $scope = $rootScope.$new();
    $compile(element)($scope);
    $scope.$digest();
  }));

  it('should replace the element with the appropriate content', function() {
    expect(element.html()).toContain('root@localhost : ');
  });
});
