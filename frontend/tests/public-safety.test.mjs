// frontend/tests/public-safety.test.mjs
// Guards the public housing-search flow against resident-composition inputs and inflated claims.
// It does not inspect dependencies, generated output, or unrelated UI primitives.

import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const flowFiles = [
  "app/page.tsx",
  "app/search/page.tsx",
  "app/neighborhood/[id]/page.tsx",
  "app/api/ai-search/route.ts",
  "components/ai-search.tsx",
  "components/search-map.tsx",
  "lib/neighborhoods.ts",
]

const excludedConcepts = [
  ["eth", "nic"],
  ["reli", "gious"],
  ["diver", "sity"],
  ["demo", "graphic"],
  ["top", "Eth", "nicity"],
  ["top", "Reli", "gion"],
].map((parts) => parts.join(""))

test("search flow contains no resident-composition concepts", async () => {
  for (const path of flowFiles) {
    const source = (await readFile(new URL(`../${path}`, import.meta.url), "utf8")).toLowerCase()
    for (const concept of excludedConcepts) {
      assert.equal(source.includes(concept.toLowerCase()), false, `${path} contains excluded concept: ${concept}`)
    }
  }
})

test("landing page labels the dataset and avoids unsupported adoption claims", async () => {
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8")
  const unsupportedClaims = [
    ["trusted", " by"],
    ["happy", " customers"],
    ["data", " accuracy"],
    ["real-time", " updates"],
  ]
    .map((parts) => parts.join(""))
    .join("|")

  assert.match(source, /synthetic data/i)
  assert.doesNotMatch(source, new RegExp(unsupportedClaims, "i"))
})
