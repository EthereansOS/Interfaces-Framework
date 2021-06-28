function formatLink({ context }, link) {
  // If it;s an array, just consider the first element
  link = link ? (link instanceof Array ? link[0] : link) : ''
  // If there is no `assets` in the path, return the passed param (or the first element, if array)
  if (link.indexOf('assets') === 0 || link.indexOf('/assets') === 0) {
    return link
  }

  // changes "ipfs://ipfs/", "ipfs://" to
  for (const temp of context.ipfsUrlTemplates) {
    link = link.split(temp).join(context.ipfsUrlChanger)
  }
  while (link && link.startsWith('/')) {
    link = link.substring(1)
  }
  return (!link ? '' : link.indexOf('http') === -1 ? 'https://' + link : link)
    .split('https:')
    .join('')
    .split('http:')
    .join('')
}

export default formatLink
