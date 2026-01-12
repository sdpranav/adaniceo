import sharp from 'sharp'
import { readdirSync, statSync } from 'fs'
import { join } from 'path'

const assetsDir = './src/assets'
const files = readdirSync(assetsDir).filter(f => f.endsWith('.png'))

console.log('🖼️  Converting PNG images to WebP...\n')

for (const file of files) {
    const input = join(assetsDir, file)
    const output = join(assetsDir, file.replace('.png', '.webp'))

    const inputSize = statSync(input).size

    await sharp(input)
        .webp({ quality: 90, effort: 6 }) // High quality, good compression
        .toFile(output)

    const outputSize = statSync(output).size
    const reduction = ((1 - outputSize / inputSize) * 100).toFixed(1)

    console.log(`✓ ${file}`)
    console.log(`  ${(inputSize / 1024 / 1024).toFixed(2)} MB → ${(outputSize / 1024 / 1024).toFixed(2)} MB (${reduction}% smaller)\n`)
}

console.log('✅ Conversion complete!')
