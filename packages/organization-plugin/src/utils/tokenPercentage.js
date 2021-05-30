const tokenPercentage = (amount, totalSupply) => {
  amount = (amount && amount.value) || amount
  amount =
    (typeof amount).toLowerCase() === 'string' ? parseInt(amount) : amount
  totalSupply = (totalSupply && totalSupply.value) || totalSupply
  totalSupply =
    (typeof totalSupply).toLowerCase() === 'string'
      ? parseInt(totalSupply)
      : totalSupply
  if (!amount) {
    return '0%'
  }

  var percentage = amount / (totalSupply / 100)
  return Math.round(percentage) + '%'
}

export default tokenPercentage
