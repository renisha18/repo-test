# Relay

Relay is a demo agent that runs an automated bug-fix pipeline end to end: it
picks up an issue, plans a focused change, edits the code, and verifies the
result. This repository is the small sample web app that the pipeline operates
on — a controlled fixture used to exercise and demonstrate that workflow.

The project deliberately stays tiny so each run has a clear, reviewable diff:
a home page, a login form, their stylesheets, and a Node-based check that
guards against a known regression.

## Overview / Features

- **Home page** (`src/components/Home.tsx`, `styles/home.css`) — a simple card
  that introduces Relay, rendered as a React/TSX component.
- **Login form** (`src/components/LoginForm.tsx`, `styles/login.css`) — email
  and password fields with a primary "Log in" button. `styles/login.css`
  carries a documented layout bug (a fixed pixel width that overflows narrow
  screens) for the pipeline to fix.
- **Logo asset** (`public/logo.svg`) — the Relay mark used by the home page.
- **Regression check** (`test/run.js`) — a dependency-free Node script that
  asserts `.btn-primary` in `styles/login.css` does not use a fixed 3-digit
  pixel width.

## Prerequisites

- [Node.js](https://nodejs.org/) with `npm` (the `test` script runs plain
  `node`; no minimum version is pinned in the repo — TODO: confirm supported
  Node versions).

## Installation

```bash
git clone <repository-url>
cd repo-test
npm install
```

There are currently no runtime or dev dependencies declared in
`package.json`, so `npm install` only sets up the lockfile.

## Usage / Quick Start

Run the regression check:

```bash
npm test
```

This executes `node test/run.js`, which prints `PASS: login button width is
responsive` on success and exits non-zero with a `FAIL:` message otherwise.

> **Note:** The repository does not include a build tool, dev server, or test
> runner for the React components in `src/` — TODO: add one if the components
> need to be rendered or unit-tested directly.

## Configuration

No configuration files or environment variables are used by this repository.

## Contributing

- **Reporting an issue:** Search the existing issues first to avoid
  duplicates. If nothing matches, open a new issue with a clear description
  and the steps needed to reproduce it.
- **Submitting a pull request:** Fork the repository or create a branch, and
  keep your changes focused on a single concern. Reference the related issue
  in your PR description and open the pull request against the `main` branch.
- Run `npm test` before submitting and make sure it passes.

## License

No license file is present in this repository. TODO: add a `LICENSE` file to
clarify usage terms.
