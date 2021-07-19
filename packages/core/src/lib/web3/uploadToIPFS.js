async function uploadToIPFS({ context, ipfsHttpClient }, files) {
  const single =
    !(files instanceof Array) &&
    (!(files instanceof FileList) || files.length === 0)
  files = single ? [files] : files

  const list = []
  for (let i = 0; i < files.length; i++) {
    let file = files.item ? files.item(i) : files[i]
    if (!(file instanceof File) && !(file instanceof Blob)) {
      file = new Blob([JSON.stringify(file, null, 4)], {
        type: 'application/json',
      })
    }
    list.push(file)
  }

  const hashes = []
  for (const item of list) {
    const upload = await ipfsHttpClient.add(item)
    hashes.push(context.ipfsUrlTemplates[0] + upload.path)
  }

  return single ? hashes[0] : hashes
}

export default uploadToIPFS
