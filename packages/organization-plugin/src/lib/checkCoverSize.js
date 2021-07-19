function checkCoverSize(cover, width, height) {
  cover = (cover.item && cover.item(0)) || cover
  width = width || 320
  height = height || width
  return new Promise(function (ok) {
    var reader = new FileReader()
    reader.addEventListener(
      'load',
      function () {
        var image = new Image()
        image.onload = function onload() {
          return ok(image.width === width && image.height === height)
        }
        image.src = (window.URL || window.webkitURL).createObjectURL(cover)
      },
      false
    )
    reader.readAsDataURL(cover)
  })
}

export default checkCoverSize
