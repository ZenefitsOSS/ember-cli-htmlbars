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

  it('sets evalTemplates for all builds environments other than production', function(){
    var context = {};
    context.projectConfig = function () { return {}; };
    context.templateCompilerPath = function () { return './ember-addon-main'; };
    context.astPlugins = function () { };
    assert.equal(addonMain.htmlbarsOptions.apply(context).evalTemplates, true);
  });
});
