// Based on:
// <https://github.com/babel/babel/blob/main/packages/babel-helper-validator-identifier/scripts/generate-identifier-regex.js>

import fs from 'fs'
import path from 'path'
import regenerate from 'regenerate'
import idStart from '@unicode/unicode-13.0.0/Binary_Property/ID_Start/code-points.js'
import idCont from '@unicode/unicode-13.0.0/Binary_Property/ID_Continue/code-points.js'

var start = [36 /* `$` */, 95 /* `_` */].concat(idStart.filter((d) => bmp(d)))
var cont = [0x200c, 0x200d].concat(idCont.filter((d) => bmp(d)))

var startRe = regenerate().add(start).toRegExp()
var contRe = regenerate().add(cont).remove(start).toRegExp()

fs.writeFileSync(
  path.join('regex.js'),
  [
    '// This module is generated by `build.js`.',
    'export var start = ' + startRe,
    'export var cont = ' + contRe,
    ''
  ].join('\n')
)

function bmp(code) {
  return code <= 0xffff /* BMP */
}
