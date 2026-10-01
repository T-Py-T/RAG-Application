<!-- CONTRIBUTING.md -->
<!-- Points contributors to existing run/validate docs and private security reporting. -->
<!-- It does not define governance committees, SLAs, or production support obligations. -->

# Contributing

HomeScope is a portfolio prototype. Prefer small, focused pull requests that match the scope described in
[README.md](README.md).

## Before you open a pull request

1. Read **Run the frontend**, **Run the backend example**, and **Validate a change** in [README.md](README.md).
2. Run the checks that match your edit (backend tests, frontend `pnpm test` / `lint` / `typecheck` / `build`, or
   `pre-commit run --all-files`).
3. Do not commit credentials, personal data, or live API keys.

Describe what changed and why in the pull request. There is no separate issue template or maintainer roster.

## Security

Use the private route in [SECURITY.md](SECURITY.md) for suspected vulnerabilities. Do not post exploit details in a
public issue.

## Related documentation

- [.github/dependabot.yml](.github/dependabot.yml) — scheduled dependency updates; tip-cite guidance (tip ≠ READY)
- [docs/HIREABILITY.md](docs/HIREABILITY.md) — skills-and-links index for reviewers
- [SECURITY.md](SECURITY.md) — vulnerability reporting and scope
- [LICENSE](LICENSE) — MIT terms

**Revision cited:** `07fc403` (current `main` tip at open); alignment for this documentation packet may resolve when
this pull request merges.
