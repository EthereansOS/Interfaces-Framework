function formatLink(context, link) {
  link = link ? (link instanceof Array ? link[0] : link) : ''
  if (link.indexOf('assets') === 0 || link.indexOf('/assets') === 0) {
    return link
  }
  for (var temp of context.ipfsUrlTemplates) {
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
