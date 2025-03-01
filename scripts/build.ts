import pMap from 'p-map'
import glob from 'fast-glob'
import path from 'node:path'
import fs from 'fs-extra'

const dest = path.resolve(process.cwd(), 'assets/fonts')

const main = async () => {
  await fs.ensureDir(dest)
  const cssFiles = await glob(
    glob.convertPathToPattern(process.cwd()) +
      '/node_modules/@ibm/**/woff2/**/*.css',
  )
  const fontFiles = await glob(
    glob.convertPathToPattern(process.cwd()) +
      '/node_modules/@ibm/**/woff2/**/*.woff2',
  )

  console.log(cssFiles, fontFiles)

  await pMap([...cssFiles, ...fontFiles], async (file) => {
    const fontName = /@ibm\/(.+?)\//.exec(file)![1]
    return fs.copy(file, path.resolve(dest, fontName, path.basename(file)))
  })
}

main()
