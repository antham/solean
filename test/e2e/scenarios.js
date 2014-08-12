'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('angularjs-console', function() {

  beforeEach(function() {
    browser.get('index.html');
  });

  it('should showing up new command line field at startup', function() {
    expect(element.all(by.css('div.angularjs-console-terminal')).count()).toEqual(1);
    expect(element(by.css('span.angularjs-console-prompt-label')).getText()).toEqual('root@localhost >');
    expect(element(by.css('span.angularjs-console-prompt')).getText()).toEqual('');
  });

  it('should trigger focus on textarea after clicking in console area', function() {
    element(by.css('div.angularjs-console-terminal')).click();
    expect(browser.driver.switchTo().activeElement().getAttribute('class')).toContain('angularjs-console-typer');
  });

  it('should displayed entered command lines', function() {
    element(by.css('div.angularjs-console-terminal')).click();

    var textarea = element(by.css('textarea.angularjs-console-typer'));
    textarea.sendKeys('hello world !');
    textarea.sendKeys(protractor.Key.ENTER);
    textarea.sendKeys('foo');
    textarea.sendKeys(protractor.Key.ENTER);
    textarea.sendKeys('bar');
    textarea.sendKeys(protractor.Key.ENTER);

    expect(element.all(by.css('span.angularjs-console-prompt-label')).count()).toEqual(4);
    expect(element.all(by.css('span.angularjs-console-command')).count()).toEqual(3);
    expect(element.all(by.css('span.angularjs-console-prompt')).count()).toEqual(1);

    var commands = element.all(by.css('span.angularjs-console-command'));

    expect(commands.get(0).getText()).toEqual('hello world !');
    expect(commands.get(1).getText()).toEqual('foo');
    expect(commands.get(2).getText()).toEqual('bar');
  });

  it('should keeps scrolling following typing', function() {
    element(by.css('div.angularjs-console-terminal')).click();

    var textarea = element(by.css('textarea.angularjs-console-typer'));

    for(var i = 0; i < 10; i++)
    {
      textarea.sendKeys('foo');
      textarea.sendKeys(protractor.Key.ENTER);
    }

    expect(element(by.css('div.angularjs-console-terminal')).getAttribute('scrollTop')).toEqual('34');
    expect(element(by.css('div.angularjs-console-terminal')).getAttribute('scrollHeight')).toEqual('234');
  });
});
