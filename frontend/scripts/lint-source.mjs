// frontend/scripts/lint-source.mjs
// Checks hand-authored frontend files for portable whitespace and newline hygiene.
// It does not rewrite files, inspect dependencies, or replace the TypeScript compiler.

import { readdir, readFile } from "node:fs/promises"
import { extname, join, relative } from "node:path"
import process from "node:process"

const root = process.cwd()
const includedExtensions = new Set([".css", ".js", ".md", ".mjs", ".ts", ".tsx", ".yaml", ".yml"])
const excludedDirectories = new Set([".next", "node_modules"])
const violations = []

async function inspect(path) {
  for (const entry of await readdir(path, { withFileTypes: true })) {
    if (entry.isDirectory() && excludedDirectories.has(entry.name)) continue

    const entryPath = join(path, entry.name)
    if (entry.isDirectory()) {
      await inspect(entryPath)
      continue
    }
    if (!includedExtensions.has(extname(entry.name))) continue

    const source = await readFile(entryPath, "utf8")
    const lines = source.split("\n")
    lines.forEach((line, index) => {
      if (/\s+$/.test(line)) violations.push(`${relative(root, entryPath)}:${index + 1}: trailing whitespace`)
      if (line.includes("\t")) violations.push(`${relative(root, entryPath)}:${index + 1}: tab indentation`)
    })
    if (source.length > 0 && !source.endsWith("\n")) {
      violations.push(`${relative(root, entryPath)}: missing final newline`)
    }
  }
}

await inspect(root)

if (violations.length > 0) {
  console.error(violations.join("\n"))
  process.exitCode = 1
} else {
  console.log("Frontend source hygiene checks passed.")
}
