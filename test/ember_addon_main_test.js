'use strict';
var addonMain = require('../ember-addon-main');
var assert = require('assert');

describe('ember-addon-main', function(){
  var context;
  beforeEach(function() {
    // Fakes the "project"
    context = {
      project: {
        config: function () {
          return {};
        }
      }
    };
  });

  it('passes `evalTemplates` flag as true for all builds environments other than production', function(){
    var context = {};
    context.templateCompilerPath = function () { return './ember-addon-main'; };
    context.astPlugins = function () { };

    context.projectConfig = function () { return {environment: 'development'}; };
    assert.equal(addonMain.htmlbarsOptions.apply(context).evalTemplates, true);
    context.projectConfig = function () { return {environment: 'test'}; };
    assert.equal(addonMain.htmlbarsOptions.apply(context).evalTemplates, true);

    context.projectConfig = function () { return {environment: 'production'}; };
    assert.equal(addonMain.htmlbarsOptions.apply(context).evalTemplates, false);
  });

  it('sets `evalTemplates` if it is passed explicitly', function(){
    var context = {};
    context.templateCompilerPath = function () { return './ember-addon-main'; };
    context.astPlugins = function () { };

    context.projectConfig = function () { return {environment: 'development', 'ember-cli-htmlbars': {evalTemplates: false}}; };
    assert.equal(addonMain.htmlbarsOptions.apply(context).evalTemplates, false);
    context.projectConfig = function () { return {environment: 'test', 'ember-cli-htmlbars': {evalTemplates: false}}; };
    assert.equal(addonMain.htmlbarsOptions.apply(context).evalTemplates, false);

    context.projectConfig = function () { return {environment: 'test', 'ember-cli-htmlbars': {evalTemplates: true}}; };
    assert.equal(addonMain.htmlbarsOptions.apply(context).evalTemplates, true);
    context.projectConfig = function () { return {environment: 'production', 'ember-cli-htmlbars': {evalTemplates: true}}; };
    assert.equal(addonMain.htmlbarsOptions.apply(context).evalTemplates, true);
  });
});
