import extractComment from './extractComment'

function extractHTMLDescription({ context }, code, updateFirst) {
  if (!code) {
    return ''
  }
  let description = ''
  const comments =
    typeof code === 'string' ? extractComment({ context }, code) : code
  if (updateFirst) {
    comments.Update && (description += comments.Update)
    comments.Description &&
      (description +=
        (comments.Update ? '<br/><br/><b>Description</b>:<br/>' : '') +
        comments.Description)
  } else {
    comments.Description && (description += comments.Description)
    comments.Update &&
      (description +=
        (comments.Description ? '<br/><br/><b>Last Updates</b>:<br/>' : '') +
        comments.Update)
  }
  if (comments.Discussion) {
    description +=
      '<a class="ComEXTLink" href="' +
      comments.Discussion +
      '" target="_blank"><b>Discussion Link</b></a><br/><br/>'
  }
  description = description.trim()
  description &&
    (description = description.split('\n').join('<br/>').trim() + '<br/><br/>')
  return description
}

export default extractHTMLDescription
