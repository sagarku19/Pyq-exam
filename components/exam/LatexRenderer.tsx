'use client'

import { useMemo } from 'react'
import katex from 'katex'

type Token =
  | { kind: 'text'; value: string }
  | { kind: 'inline'; value: string }
  | { kind: 'block'; value: string }

function tokenize(text: string): Token[] {
  const tokens: Token[] = []
  const re = /\$\$([\s\S]+?)\$\$|\$([^\$\n]+?)\$/g
  let last = 0
  let match: RegExpExecArray | null

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      tokens.push({ kind: 'text', value: text.slice(last, match.index) })
    }
    if (match[1] !== undefined) {
      tokens.push({ kind: 'block', value: match[1] })
    } else {
      tokens.push({ kind: 'inline', value: match[2] })
    }
    last = re.lastIndex
  }
  if (last < text.length) {
    tokens.push({ kind: 'text', value: text.slice(last) })
  }
  return tokens
}

function renderKatex(latex: string, displayMode: boolean): string {
  try {
    return katex.renderToString(latex, {
      displayMode,
      throwOnError: false,
      output: 'html',
      trust: false,
    })
  } catch {
    return latex
  }
}

export function LatexRenderer({ text, className }: { text: string; className?: string }) {
  const html = useMemo(() => {
    const tokens = tokenize(text)
    return tokens
      .map((t) => {
        if (t.kind === 'text') return t.value.replace(/\n/g, '<br/>')
        if (t.kind === 'block') return `<span class="katex-block">${renderKatex(t.value, true)}</span>`
        return renderKatex(t.value, false)
      })
      .join('')
  }, [text])

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
