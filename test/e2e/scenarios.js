'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('solean', function() {

  beforeEach(function() {
    browser.get('index.html');
  });

  it('should showing up new command line field at startup', function() {
    expect(element(by.css('span.solean-welcome-message')).getText()).toEqual('Welcome on this angularjs console demo');
    expect(element.all(by.css('div.solean-terminal')).count()).toEqual(1);
    expect(element(by.css('span.solean-prompt-label')).getText()).toEqual('root@localhost >');
    expect(element(by.css('span.solean-command')).getText()).toEqual('');
  });

  it('should trigger focus on textarea after clicking in console area', function() {
    element(by.css('div.solean-terminal')).click();
    expect(browser.driver.switchTo().activeElement().getAttribute('class')).toContain('solean-typer');
  });

  it('should displays entered command lines', function() {
    element(by.css('div.solean-terminal')).click();

    var textarea = element(by.css('textarea.solean-typer'));
    textarea.sendKeys('hello world !');
    textarea.sendKeys(protractor.Key.ENTER);
    textarea.sendKeys('foo');
    textarea.sendKeys(protractor.Key.ENTER);
    textarea.sendKeys('bar');
    textarea.sendKeys(protractor.Key.ENTER);

    expect(element.all(by.css('span.solean-prompt-label')).count()).toEqual(4);
    expect(element.all(by.css('span.solean-command')).count()).toEqual(4);

    var commands = element.all(by.css('span.solean-command'));

    expect(commands.get(0).getText()).toEqual('hello world !');
    expect(commands.get(1).getText()).toEqual('foo');
    expect(commands.get(2).getText()).toEqual('bar');
  });

  it('should displays entered command lines', function() {
    element(by.css('div.solean-terminal')).click();

    var textarea = element(by.css('textarea.solean-typer'));
    textarea.sendKeys('hello world !');
    textarea.sendKeys(protractor.Key.ENTER);
    textarea.sendKeys('foo');
    textarea.sendKeys(protractor.Key.ENTER);
    textarea.sendKeys('bar');
    textarea.sendKeys(protractor.Key.ENTER);

    expect(element.all(by.css('span.solean-prompt-label')).count()).toEqual(4);
    expect(element.all(by.css('span.solean-command')).count()).toEqual(4);
    expect(element.all(by.css('span.solean-invalid-warning')).count()).toEqual(2);
    expect(element.all(by.css('span.solean-valid-complete')).count()).toEqual(1);

    var commands = element.all(by.css('span.solean-command'));

    expect(commands.get(0).getText()).toEqual('hello world !');
    expect(commands.get(1).getText()).toEqual('foo');
    expect(commands.get(2).getText()).toEqual('bar');
  });

  it('should keeps scrolling following typing', function() {
    element(by.css('div.solean-terminal')).click();

    var textarea = element(by.css('textarea.solean-typer'));

    for(var i = 0; i < 10; i++)
    {
      textarea.sendKeys('foo');
      textarea.sendKeys(protractor.Key.ENTER);
    }

    expect(element(by.css('div.solean-terminal')).getAttribute('scrollTop')).toEqual('254');
    expect(element(by.css('div.solean-terminal')).getAttribute('scrollHeight')).toEqual('454');
  });

  it('should moves cursor backward and forward', function() {
    var textarea = element(by.css('textarea.solean-typer'));

    textarea.sendKeys('hello world !');

    for(var i = 1; i < 8; i++)
    {
      textarea.sendKeys(protractor.Key.ARROW_LEFT);
    }

    expect(element(by.css('span.solean-cursor')).getText()).toEqual('w');

    textarea.sendKeys('this is a ');

    expect(element(by.css('span.solean-cursor')).getText()).toEqual('w');

    expect(element.all(by.css('span.solean-command')).get(0).getText()).toEqual('hello this is a world !');

    for(var j = 1; j < 15; j++)
    {
      textarea.sendKeys(protractor.Key.ARROW_RIGHT);
    }

    expect(element(by.css('span.solean-cursor')).getText()).toEqual(' ');
  });
});
