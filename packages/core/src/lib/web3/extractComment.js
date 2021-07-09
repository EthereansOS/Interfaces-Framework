import formatLink from './formatLink'

/**
 * @typedef {Object} ExtractCommentReturn
 * @property {string} Description
 * @property {string} Discussion
 * @property {string} Update
 */

/**
 * Extract the comment from the code
 * @param {Object} adapters - The adapters injected required by the function.
 * @param {EthosContext} adapters.context - The application context.
 * @param {string} code
 * @param {string} element
 * @return {ExtractCommentReturn}
 */
function extractComment({ context }, code, element) {
  if (code === undefined || code === null) {
    return ''
  }
  code = code.split('\r').join('').trim()

  if (!element) {
    const comments = {}
    ;['Description', 'Discussion', 'Update'].map(
      (key) => (comments[key] = extractComment({ context }, code, key))
    )
    comments.Discussion &&
      (comments.Discussion = formatLink({ context }, comments.Discussion))
    return comments
  }

  const initialCode = '/* ' + element + ':\n'
  const finalCode = '\n */\n'
  let start = code.indexOf(initialCode)
  if (start === -1) {
    return ''
  }
  start += initialCode.length
  let end = code.indexOf(finalCode, start)
  end =
    end === -1
      ? code.indexOf(finalCode.substring(0, finalCode.length - 1), start)
      : end
  const data = code.substring(start, end)
  const split = data.split('\n')
  for (let i = 0; i < split.length; i++) {
    let tag = split[i]
    if (tag.indexOf(' * ') === 0) {
      try {
        tag = tag.substring(3).trim()
      } catch (e) {
        tag = tag.substring(2).trim()
      }
      split[i] = tag
    }
    if (tag.indexOf(' *') === 0) {
      try {
        tag = tag.substring(2).trim()
      } catch (e) {
        tag = tag.substring(1).trim()
      }
      split[i] = tag
    }
  }
  return split.join('\n').trim()
}

export default extractComment
