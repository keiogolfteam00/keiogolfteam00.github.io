import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'
import { existsSync, statSync } from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const assetsDir = path.join(__dirname, '../public/assets')
const heroSrc = path.join(assetsDir, 'hero-image.jpg')

if (!existsSync(heroSrc)) {
  console.error('hero-image.jpg not found')
  process.exit(1)
}

// モバイル向け (480w, 768w) は品質を下げてファイルサイズを削減
const heroSizes = [
  { width: 1920, suffix: '-1920', webpQuality: 82, avifQuality: 55 },
  { width: 1280, suffix: '-1280', webpQuality: 82, avifQuality: 52 },
  { width: 768, suffix: '-768', webpQuality: 65, avifQuality: 48 },
  { width: 480, suffix: '-480', webpQuality: 62, avifQuality: 45 },
]

console.log('Generating hero WebP variants...')
for (const { width, suffix, webpQuality } of heroSizes) {
  const outPath = path.join(assetsDir, `hero-image${suffix}.webp`)
  await sharp(heroSrc)
    .resize(width, null, { withoutEnlargement: true })
    .webp({ quality: webpQuality })
    .toFile(outPath)
  const { size } = statSync(outPath)
  console.log(`  ${path.basename(outPath)}: ${(size / 1024).toFixed(0)} KB`)
}

console.log('Generating hero AVIF variants...')
for (const { width, suffix, avifQuality } of heroSizes) {
  const outPath = path.join(assetsDir, `hero-image${suffix}.avif`)
  await sharp(heroSrc)
    .resize(width, null, { withoutEnlargement: true })
    .avif({ quality: avifQuality, effort: 6 })
    .toFile(outPath)
  const { size } = statSync(outPath)
  console.log(`  ${path.basename(outPath)}: ${(size / 1024).toFixed(0)} KB`)
}

console.log('Generating fallback compressed JPEG...')
const fallbackPath = path.join(assetsDir, 'hero-image-1920.jpg')
await sharp(heroSrc)
  .resize(1920, null, { withoutEnlargement: true })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(fallbackPath)
const { size: fallbackSize } = statSync(fallbackPath)
console.log(`  hero-image-1920.jpg: ${(fallbackSize / 1024).toFixed(0)} KB`)

console.log('Generating OGP image (1200x630)...')
const ogpPath = path.join(assetsDir, 'ogp-image.jpg')
await sharp(heroSrc)
  .resize(1200, 630, { fit: 'cover', position: 'center' })
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile(ogpPath)
const { size: ogpSize } = statSync(ogpPath)
console.log(`  ogp-image.jpg: ${(ogpSize / 1024).toFixed(0)} KB`)

console.log('Done.')
