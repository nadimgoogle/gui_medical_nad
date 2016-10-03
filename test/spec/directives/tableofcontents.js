'use strict';

describe('Directive: tableOfContents', function () {

  // load the directive's module
  beforeEach(module('sbAdminApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<table-of-contents></table-of-contents>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the tableOfContents directive');
  }));
});
