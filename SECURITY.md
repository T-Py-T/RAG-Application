<!-- SECURITY.md -->
<!-- Explains how to report a suspected vulnerability without publishing sensitive details. -->
<!-- It does not promise a response time, support contract, or deployed security posture. -->

# Security policy

## Report a vulnerability privately

Please do not open a public issue for a suspected vulnerability or include credentials, personal data, or exploit
details in a public discussion.

Send the repository owner a private report at `tnt850910@aol.com` with:

- the affected revision and component;
- a concise description of the impact;
- minimal reproduction steps using synthetic data; and
- suggested remediation, if known.

You may omit proof-of-concept material that could expose another person or system. The owner will assess the report
and coordinate disclosure when appropriate. This repository is a local prototype and has no supported production
deployment.

## Scope

**In scope** for private reports:

- Issues in this repository’s `frontend/` or `backend/` code that affect confidentiality, integrity, or availability
  when run locally as described in [README.md](README.md).
- Reproducible dependency concerns tied to the committed lockfiles and requirements files.

**Out of scope:**

- Synthetic fixture accuracy, map visualization limits, or other product limitations listed in README.
- Prototype-only surfaces (auth pages, dashboard, database scripts) that README does not require for the documented
  walkthrough.
- Systems or deployments you operate outside this repository.

There is no bug bounty, paid reward, or guaranteed response timeline.

## Related documentation

- [README.md](README.md) — architecture, run and validate instructions, limitations
- [docs/HIREABILITY.md](docs/HIREABILITY.md) — short reviewer and discoverability index
- [LICENSE](LICENSE) — MIT terms

**Revision cited:** `07fc403` (current `main` tip at open); alignment for this documentation packet may resolve when
this pull request merges.
