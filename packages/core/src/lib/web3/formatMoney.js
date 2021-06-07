// TODO verify if this function is used somewhereelse
function eliminateFloatingFinalZeroes(value, decSeparator) {
  decSeparator = decSeparator || '.'
  if (value.indexOf(decSeparator) === -1) {
    return value
  }
  var split = value.split(decSeparator)
  while (split[1].endsWith('0')) {
    split[1] = split[1].substring(0, split[1].length - 1)
  }
  return split[1].length === 0 ? split[0] : split.join(decSeparator)
}

// TODO test and refactor this function
function formatMoney(value, decPlaces, thouSeparator, decSeparator) {
  value = (typeof value).toLowerCase() !== 'number' ? parseFloat(value) : value
  var n = value,
    decPlaces = isNaN((decPlaces = Math.abs(decPlaces))) ? 2 : decPlaces,
    decSeparator = decSeparator == undefined ? '.' : decSeparator,
    thouSeparator = thouSeparator == undefined ? ',' : thouSeparator,
    sign = n < 0 ? '-' : '',
    i = parseInt((n = Math.abs(+n || 0).toFixed(decPlaces))) + '',
    j = (j = i.length) > 3 ? j % 3 : 0
  var result =
    sign +
    (j ? i.substr(0, j) + thouSeparator : '') +
    i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thouSeparator) +
    (decPlaces
      ? decSeparator +
        Math.abs(n - i)
          .toFixed(decPlaces)
          .slice(2)
      : '')
  return eliminateFloatingFinalZeroes(result, decSeparator)
}

export default formatMoney
