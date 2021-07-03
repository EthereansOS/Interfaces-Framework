import formatLink from './formatLink'

function extractComment({ context }, code, element) {
  if (code === undefined || code === null) {
    return ''
  }
  code = code.split('\r').join('').trim()
  if (!element) {
    var comments = {}
    ;['Description', 'Discussion', 'Update'].map(
      (key) => (comments[key] = extractComment({ context }, code, key))
    )
    comments.Discussion &&
      (comments.Discussion = formatLink({ context }, comments.Discussion))
    return comments
  }
  var initialCode = '/* ' + element + ':\n'
  var finalCode = '\n */\n'
  var start = code.indexOf(initialCode)
  if (start === -1) {
    return ''
  }
  start += initialCode.length
  var end = code.indexOf(finalCode, start)
  end =
    end === -1
      ? code.indexOf(finalCode.substring(0, finalCode.length - 1), start)
      : end
  var data = code.substring(start, end)
  var split = data.split('\n')
  for (var i = 0; i < split.length; i++) {
    var tag = split[i]
    if (tag.indexOf(' * ') === 0) {
      try {
        split[i] = tag = tag.substring(3).trim()
      } catch (e) {
        split[i] = tag = tag.substring(2).trim()
      }
    }
    if (tag.indexOf(' *') === 0) {
      try {
        split[i] = tag = tag.substring(2).trim()
      } catch (e) {
        split[i] = tag = tag.substring(1).trim()
      }
    }
  }
  return split.join('\n').trim()
}

export default extractComment
