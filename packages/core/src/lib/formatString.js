// The original code of this function directly edited the String prototype
// instead here we produce a pure function with the same logic

export default function formatString(str, ...args) {
  // const args = arguments.slice(1) // we slice here since the first parameter now is the string itself
  return str.replace(/{(\d+)}/g, function (match, number) {
    return typeof args[number] !== 'undefined' ? args[number] : match
  })
}
