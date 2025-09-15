import fs from 'fs'
import path from 'path'
import pdfParse from 'pdf-parse'

function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&apos;')
    .replace(/`/g, '&#96;')
}

function isLikelyHeading(text) {
  const t = text.trim()
  if (t.length < 80 && /[A-Za-z]/.test(t)) {
    const letters = t.replace(/[^A-Za-z]/g, '')
    const upperRatio = letters ? (letters.replace(/[a-z]/g, '').length / letters.length) : 0
    if (upperRatio > 0.8) return true
    if (/^(introduction|scope|definitions|warranty|limitation|privacy|returns|refunds|governing law|changes|contact)/i.test(t)) return true
  }
  return false
}

async function main() {
  const root = process.cwd()
  let pdfPath = path.join(root, 'Calc Ai Terms, Policies & Disclaimers (draft V1) (1).pdf')
  if (!fs.existsSync(pdfPath)) {
    const candidates = fs.readdirSync(root).filter(f => f.toLowerCase().endsWith('.pdf'))
    if (!candidates.length) {
      console.error('No PDF found in website root to extract terms from.')
      process.exit(1)
    }
    pdfPath = path.join(root, candidates[0])
  }

  const buf = fs.readFileSync(pdfPath)
  const data = await pdfParse(buf)
  const raw = data.text || ''

  const paras = raw
    .split(/\r?\n\s*\r?\n+/)
    .map(p => p.replace(/\r?\n+/g, ' ').trim())
    .filter(p => p.length)

  const htmlParts = []
  for (const p of paras) {
    const safe = escapeHtml(p)
    if (isLikelyHeading(p)) {
      htmlParts.push(`<h2>${safe}</h2>`) 
    } else {
      htmlParts.push(`<p>${safe}</p>`) 
    }
  }

  const html = htmlParts.join('\n')

  const outDir = path.join(root, 'content')
  try { fs.mkdirSync(outDir, { recursive: true }) } catch {}
  const outFile = path.join(outDir, 'terms.js')
  const js = `// Auto-generated from PDF. Do not edit by hand.\nexport const TERMS_HTML = \`${html}\`\n`
  fs.writeFileSync(outFile, js, 'utf8')
  console.log('Extracted terms to', outFile)
}

main().catch(err => { console.error(err); process.exit(1) })

