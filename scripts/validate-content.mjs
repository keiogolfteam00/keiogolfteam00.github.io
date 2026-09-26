#!/usr/bin/env node
// Validates every file under /content against its JSON Schema.
// Run via `npm run validate`. CI runs this before `npm run build`,
// so a malformed content file fails the deploy *before* it ships.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import Ajv from 'ajv/dist/2020.js'
import addFormats from 'ajv-formats'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const pairs = [
  { data: 'content/content.json',     schema: 'content/schemas/content.schema.json' },
  { data: 'content/prospective.json', schema: 'content/schemas/prospective.schema.json' },
  { data: 'content/members.json',     schema: 'content/schemas/members.schema.json' },
  { data: 'content/schedule.json',    schema: 'content/schemas/schedule.schema.json' },
]

const ajv = new Ajv({ allErrors: true, strict: false })
addFormats(ajv)

let hasError = false

for (const { data, schema } of pairs) {
  const dataPath = path.join(root, data)
  const schemaPath = path.join(root, schema)

  let parsed
  try {
    parsed = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
  } catch (e) {
    console.error(`❌ JSON 構文エラー: ${data}`)
    console.error(`   ${e.message}`)
    console.error(`   → GitHub の編集画面でファイルを開き、エラー箇所のクオート（"）やカンマ（,）を確認してください。`)
    hasError = true
    continue
  }

  let schemaJson
  try {
    schemaJson = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))
  } catch (e) {
    console.error(`❌ スキーマファイルが読み込めません: ${schema}`)
    console.error(`   ${e.message}`)
    hasError = true
    continue
  }

  const validate = ajv.compile(schemaJson)
  if (!validate(parsed)) {
    console.error(`❌ スキーマ検証エラー: ${data}`)
    for (const err of validate.errors) {
      const where = err.instancePath || '(全体)'
      console.error(`   ${where} → ${err.message}`)
      if (err.params && Object.keys(err.params).length > 0) {
        console.error(`      ${JSON.stringify(err.params)}`)
      }
    }
    hasError = true
  } else {
    console.log(`✅ ${data}`)
  }
}

if (hasError) {
  console.error('\nコンテンツファイルにエラーがあります。修正してから再度コミットしてください。')
  console.error('詳しくは EDITING.md の「よくあるミス」セクションをご覧ください。')
  process.exit(1)
}

console.log('\nすべてのコンテンツファイルが有効です。')
