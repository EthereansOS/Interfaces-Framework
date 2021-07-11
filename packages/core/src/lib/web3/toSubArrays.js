function toSubArrays(array, chunks) {
  var subArrays = []
  var i,
    j,
    chunk = chunks || 100
  for (i = 0, j = array.length; i < j; i += chunk) {
    subArrays.push(array.slice(i, i + chunk))
  }
  return subArrays
}

export default toSubArrays
