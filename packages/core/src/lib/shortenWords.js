function shortenWord({ context }, word, charsAmount) {
  return word
    ? word.substring(
        0,
        word.length < (charsAmount = charsAmount || context.defaultCharsAmount)
          ? word.length
          : charsAmount
      ) + (word.length < charsAmount ? '' : '...')
    : ''
}

export default shortenWord
