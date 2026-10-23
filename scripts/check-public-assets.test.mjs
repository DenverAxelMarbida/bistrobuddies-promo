import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { mkdtemp, mkdir, rm, writeFile, symlink } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { test } from 'node:test'
import { checkAssets } from './check-public-assets.mjs'

const hash = (text) => createHash('sha256').update(text).digest('hex')
const rules = {
  restrictedStems: ['home', 'checkout-1', 'checkout-2', 'checkout-3', 'order-2'],
  restrictedHashes: [hash('restricted fixture')],
  approved: { 'safe.jpg': hash('approved fixture') },
}

async function fixture(t) {
  const root = await mkdtemp(path.join(tmpdir(), 'bistro-asset-test-'))
  t.after(() => rm(root, { recursive: true, force: true }))
  await writeFile(path.join(root, 'safe.jpg'), 'approved fixture')
  return root
}

test('accepts reviewed assets with matching bytes', async (t) => {
  const root = await fixture(t)
  assert.deepEqual(await checkAssets(root, { rules }), { files: 1, approved: 1 })
})

test('rejects every restricted name, including nested paths and alternate extensions', async (t) => {
  const root = await fixture(t)
  await mkdir(path.join(root, 'nested'))
  for (const stem of rules.restrictedStems) {
    const file = path.join(root, 'nested', `${stem.toUpperCase()}.PNG`)
    await writeFile(file, 'not private data')
    await assert.rejects(checkAssets(root, { rules }), /restricted filename/)
    await rm(file)
  }
})

test('rejects restricted bytes even at an approved filename', async (t) => {
  const root = await fixture(t)
  await writeFile(path.join(root, 'safe.jpg'), 'restricted fixture')
  await assert.rejects(checkAssets(root, { rules }), /known restricted content/)
})

test('rejects unreviewed files, including hidden files and archives', async (t) => {
  const root = await fixture(t)
  for (const name of ['.env', 'backup.zip', 'new-image.jpg']) {
    await writeFile(path.join(root, name), 'fixture')
    await assert.rejects(checkAssets(root, { rules }), /unreviewed public asset/)
    await rm(path.join(root, name))
  }
})

test('rejects missing or altered approved assets', async (t) => {
  const root = await fixture(t)
  await writeFile(path.join(root, 'safe.jpg'), 'changed fixture')
  await assert.rejects(checkAssets(root, { rules }), /SHA-256 mismatch/)
  await rm(path.join(root, 'safe.jpg'))
  await assert.rejects(checkAssets(root, { rules }), /required asset missing/)
})

test('rejects directory links instead of following them', async (t) => {
  const root = await fixture(t)
  const outside = await mkdtemp(path.join(tmpdir(), 'bistro-outside-'))
  t.after(() => rm(outside, { recursive: true, force: true }))
  await symlink(outside, path.join(root, 'linked'), process.platform === 'win32' ? 'junction' : 'dir')
  await assert.rejects(checkAssets(root, { rules }), /symbolic links/)
})

test('dist permits generated bundles but still rejects private or unreviewed files', async (t) => {
  const root = await fixture(t)
  await mkdir(path.join(root, 'assets'))
  await writeFile(path.join(root, 'index.html'), '<html></html>')
  await writeFile(path.join(root, 'assets/app-123.js'), '// bundle')
  await checkAssets(root, { rules, built: true })
  await writeFile(path.join(root, 'assets/home.jpg'), 'fixture')
  await assert.rejects(checkAssets(root, { rules, built: true }), /restricted filename/)
})
