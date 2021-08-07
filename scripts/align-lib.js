const watch = require('node-watch')
const { debounce } = require('throttle-debounce')
const path = require('path')
const fs = require('fs')
const copy = require('recursive-copy')

if (process.argv.length < 3) {
  console.error('Missing module path')
  process.exit(1)
}
const modulePath = path.resolve(process.cwd(), process.argv[2])

const package = JSON.parse(
  fs.readFileSync(path.resolve(modulePath, 'package.json'))
)

const packageName = package.name

const sourcePath = path.resolve(modulePath, 'dist')
const destPath = path.resolve(
  process.cwd(),
  'node_modules',
  packageName,
  'dist'
)

const debounced = debounce(1000, async () => {
  await copy(sourcePath, destPath, { overwrite: true })
  console.log('File copied')
})

watch(sourcePath, { recursive: true }, function (evt, name) {
  debounced()
})
