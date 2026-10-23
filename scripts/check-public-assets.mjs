import { createHash } from 'node:crypto'
import { lstat, readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const policy = JSON.parse(await readFile(new URL('./public-assets.json', import.meta.url), 'utf8'))

export async function checkAssets(directory, { built = false, rules = policy } = {}) {
  const errors = []
  const seen = new Set()
  const restrictedHashes = new Set(rules.restrictedHashes)

  async function visit(relative = '') {
    const absolute = path.join(directory, relative)
    const stat = await lstat(absolute)
    if (stat.isSymbolicLink()) {
      errors.push(`${relative || '.'}: symbolic links are not allowed`)
      return
    }
    if (stat.isDirectory()) {
      for (const name of (await readdir(absolute)).sort()) {
        await visit(relative ? `${relative}/${name}` : name)
      }
      return
    }
    if (!stat.isFile()) {
      errors.push(`${relative}: unsupported filesystem entry`)
      return
    }
    seen.add(relative)
    const name = path.basename(relative).toLowerCase()
    if (rules.restrictedStems.some((stem) => name === stem || name.startsWith(`${stem}.`))) {
      errors.push(`${relative}: restricted filename`)
    }
    const hash = createHash('sha256').update(await readFile(absolute)).digest('hex')
    if (restrictedHashes.has(hash)) errors.push(`${relative}: known restricted content`)

    const expected = Object.hasOwn(rules.approved, relative) ? rules.approved[relative] : undefined
    const generated = built && (relative === 'index.html' || /^assets\/[^/]+\.(?:js|css|woff2)$/.test(relative))
    if (!expected && !generated) errors.push(`${relative}: unreviewed public asset`)
    if (expected && expected !== hash) errors.push(`${relative}: approved SHA-256 mismatch`)
  }

  await visit()
  for (const relative of Object.keys(rules.approved)) {
    if (!seen.has(relative)) errors.push(`${relative}: required asset missing`)
  }
  if (errors.length) throw new Error(`Asset safety check failed:\n${errors.join('\n')}`)
  return { files: seen.size, approved: Object.keys(rules.approved).length }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const target = process.argv[2] || 'public'
  if (!['public', 'dist'].includes(target)) throw new Error('Use public or dist as the check target')
  const root = fileURLToPath(new URL('../', import.meta.url))
  try {
    const result = await checkAssets(path.join(root, target), { built: target === 'dist' })
    console.log(`${target}: PASS (${result.files} files checked; ${result.approved} approved assets match SHA-256)`)
  } catch (error) {
    console.error(error.message)
    process.exitCode = 1
  }
}
