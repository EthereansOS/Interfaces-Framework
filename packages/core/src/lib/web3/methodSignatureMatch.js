function methodSignatureMatch(methodSignature, compare) {
  for (var i in compare.abi) {
    var abi = compare.abi[i]
    if (
      abi.type === 'function' &&
      abi.name + '(' + abi.inputs.map((it) => it.type).join(',') + ')' ===
        methodSignature
    ) {
      return true
    }
  }
  return false
}

export default methodSignatureMatch
