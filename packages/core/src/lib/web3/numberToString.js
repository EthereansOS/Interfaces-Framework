function numberToString(num, locale) {
  if (locale) {
    throw new Error('Locale not supported')
  }
  num = num || 0

  if ((typeof num).toLowerCase() === 'string') {
    return num
  }

  let numStr = String(num)

  if (Math.abs(num) < 1.0) {
    let e = parseInt(num.toString().split('e-')[1])
    if (e) {
      let negative = num < 0
      if (negative) num *= -1
      num *= Math.pow(10, e - 1)
      numStr = '0.' + new Array(e).join('0') + num.toString().substring(2)
      if (negative) numStr = '-' + numStr
    }
  } else {
    let e = parseInt(num.toString().split('+')[1])
    if (e > 20) {
      e -= 20
      num /= Math.pow(10, e)
      numStr = num.toString() + new Array(e + 1).join('0')
    }
  }

  /* // this branch is not usd in the app. In case is required uncommeent, refactor and fix
  if (locale === true) {
    const numStringSplitted = numStr.split(' ').join('').split('.')
    return (
      parseInt(numStringSplitted[0]).toLocaleString() +
      (numStringSplitted.length === 1
        ? ''
        : Utils.decimalsSeparator + numStringSplitted[1])
    )
  }
  */
  return numStr
}

export default numberToString
