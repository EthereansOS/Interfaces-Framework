async function uploadToIPFS({ context, ipfsHttpClient }, files) {
  var single =
    !(files instanceof Array) &&
    (!(files instanceof FileList) || files.length === 0)
  files = single ? [files] : files
  var list = []
  for (var i = 0; i < files.length; i++) {
    var file = files.item ? files.item(i) : files[i]
    if (!(file instanceof File) && !(file instanceof Blob)) {
      file = new Blob([JSON.stringify(file, null, 4)], {
        type: 'application/json',
      })
    }
    list.push(file)
  }
  var hashes = []
  for await (var upload of ipfsHttpClient.add(list)) {
    hashes.push(context.ipfsUrlTemplates[0] + upload.path)
  }
  return single ? hashes[0] : hashes
}

export default uploadToIPFS
