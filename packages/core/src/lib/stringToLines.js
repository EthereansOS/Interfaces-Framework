export default function toLines(str) {
  var realSplit = str.trim().split('\n')
  var split = []
  for (var i = 0; i < realSplit.length; i++) {
    if (realSplit[i].trim() === 'null' || realSplit[i].trim() === 'undefined') {
      continue
    }
    split.push(realSplit[i])
  }
  return split
}
