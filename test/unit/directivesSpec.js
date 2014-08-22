'use strict';


describe('directives', function() {

  var $scope = null;
  var element = null;

  beforeEach(module('angularjsConsole'));

  beforeEach(inject(function($compile, $rootScope){
    element = angular.element('<angularjs-console-terminal></angularjs-console-terminal>');
    $scope = $rootScope.$new();
    $compile(element)($scope);
    $scope.$digest();
  }));

  it('should replace the element with the appropriate content', function() {
    expect(angular.element(element).text()).toContain('$ ');
  });
});
