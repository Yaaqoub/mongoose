/**
 * Test dependencies.
 */

'use strict';

const assert = require('assert');
const start = require('./common');

const mongoose = start.mongoose;

describe('model translate aliases', function() {
  it('should translate correctly', function() {
    const Syntax = new mongoose.Schema({
      s: { type: String, alias: 'syntax' }
    });

    const Character = mongoose.model('Character', new mongoose.Schema({
      d: { type: Syntax, alias: 'dot' },
      name: { type: String, alias: '名' },
      bio: {
        age: { type: Number, alias: '年齢' }
      }
    }));

    assert.deepEqual(
      // Translate aliases
      Character.translateAliases({
        '名': 'Stark',
        '年齢': 30,
        'dot.syntax': 'DotSyntax'
      }),
      // How translated aliases suppose to look like
      {
        name: 'Stark',
        'bio.age': 30,
        'd.s': 'DotSyntax'
      }
    );
  });
});
