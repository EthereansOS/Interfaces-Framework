import { getSolidityUtilities, getSupportedSolidityVersion } from '@dfohub/core'

async function generateAndCompileContract(
  sourceCode,
  lines,
  descriptions,
  updates,
  prefixedLines,
  postFixedLines
) {
  sourceCode = JSON.parse(JSON.stringify(sourceCode))
  let bodyStart = 3
  for (var i = 0; i < sourceCode.length; i++) {
    if (sourceCode[i].trim().toLowerCase() === 'function_body') {
      bodyStart = i
      sourceCode.splice(bodyStart, 1)
      break
    }
  }

  if (lines && lines.length) {
    for (var i = lines.length - 1; i >= 0; i--) {
      lines[i] !== 'undefined' &&
        lines[i] !== 'null' &&
        sourceCode.splice(bodyStart, 0, '        ' + lines[i])
    }
  }

  if (prefixedLines && prefixedLines.length) {
    sourceCode.splice(2, 0, '')
    for (var i = prefixedLines.length - 1; i >= 0; i--) {
      prefixedLines[i] !== 'undefined' &&
        prefixedLines[i] !== 'null' &&
        sourceCode.splice(2, 0, '    ' + prefixedLines[i])
    }
  }

  var compilers = (await getSolidityUtilities().getCompilers()).releases
  var version = (await getSupportedSolidityVersion())[0] //Object.keys(compilers)[0];
  sourceCode.unshift('')
  sourceCode.unshift('pragma solidity ^' + version + ';')

  if (updates && updates.length) {
    sourceCode.unshift(' */')
    for (var i = updates.length - 1; i >= 0; i--) {
      sourceCode.unshift(' * ' + updates[i])
    }
    sourceCode.unshift('/* Update:')
  }

  sourceCode.unshift(' */')
  for (var i = descriptions.length - 1; i >= 0; i--) {
    sourceCode.unshift(' * ' + descriptions[i])
  }
  sourceCode.unshift('/* Description:')

  if (postFixedLines && postFixedLines.length) {
    sourceCode.push('')
    postFixedLines.forEach((it) => sourceCode.push(it))
  }

  sourceCode = sourceCode.join('\n')
  return {
    sourceCode,
    selectedContract: (
      await getSolidityUtilities().compile(sourceCode, compilers[version])
    ).optimized.DFOHubGeneratedProposal,
  }
}

export default generateAndCompileContract
