<!-- docs/HIREABILITY.md -->
<!-- Lean index for reviewers: what the repo demonstrates and where to look. -->
<!-- It does not claim production readiness, scores, certifications, or deployed auth. -->

# Hireability and discoverability

This page is a thin map for people skimming the repository. The runnable behavior and limits are defined in
[README.md](../README.md).

**Revision cited:** `6bb894f` (current `main` tip at open); topic and steward alignment for this packet may resolve when
this pull request merges.

## What to evaluate

| Area | Where to look | Notes |
| --- | --- | --- |
| Interactive UI and deterministic search | [frontend/](../frontend/) | Next.js 15, synthetic Austin-area fixtures, phrase parser |
| Semantic retrieval API | [backend/app.py](../backend/app.py) | FastAPI, local embeddings, fake store in tests |
| Automated checks | [.github/workflows/ci.yml](../.github/workflows/ci.yml) | Pull-request validation only |
| Vulnerability reports | [SECURITY.md](../SECURITY.md) | Private reporting route; no production deployment claimed |
| License | [LICENSE](../LICENSE) | MIT |

The Next.js search flow and the FastAPI `/ask` example are separate demonstrations; the browser UI does not call the
backend retrieval endpoint (see README architecture).

## Suggested GitHub topics

These labels help discovery; they describe the stack and intent, not a maturity gate:

`nextjs` `typescript` `fastapi` `python` `rag` `semantic-search` `prototype` `fixtures`

## Related documentation

- [README.md](../README.md) — run instructions, architecture, limitations
- [SECURITY.md](../SECURITY.md) — how to report issues privately
- [LICENSE](../LICENSE) — MIT terms
- [frontend/README.md](../frontend/README.md) — frontend-specific notes, if present
