# repo-test — Relay pipeline demo app

A tiny demo web app used to exercise the **Relay** agent pipeline end to end.
Relay is an autonomous bug-fix pipeline: it picks up an issue, plans a focused
change, edits the code, and verifies the result. This repository is the sample
project Relay runs against — it deliberately ships with a small bug and a test
that fails until the bug is fixed, giving the pipeline a complete
issue → plan → edit → verify loop to work through.

## Overview

This repo is intentionally minimal. It contains a couple of static UI
components, their stylesheets, a logo asset, and a single Node-based test. The
test encodes the "issue" that Relay is expected to resolve, so a successful run
of the pipeline ends with `npm test` passing.

### The Relay pipeline flow

Relay coordinates a short chain of agents against a target repository like this
one:

1. **Coordinator** — selects an issue and hands it to the pipeline.
2. **Planner** — inspects the repository and produces a minimal, scoped plan.
3. **Coder** — applies the smallest change that satisfies the plan.
4. **Verifier** — runs the project's tests (`npm test` here) to confirm the fix.

The `Home` component in `src/components/Home.tsx` renders a short description of
this same flow.

## Features

- Minimal, dependency-free codebase that is quick to clone and run.
- A deterministic test (`test/run.js`) that acts as the pass/fail signal for the
  pipeline.
- A deliberately introduced styling bug in `styles/login.css` for the pipeline
  to find and fix.
- Plain React function components and CSS, with no build step to configure.

## Project structure

```
.
├── package.json            # Project metadata and the `test` script
├── public/
│   └── logo.svg            # Relay logo used by the Home component
├── src/
│   └── components/
│       ├── Home.tsx        # Landing card describing the Relay pipeline
│       └── LoginForm.tsx   # Simple login form (email, password, submit)
├── styles/
│   ├── home.css            # Styles for the Home component
│   └── login.css           # Styles for the login form (contains the bug)
└── test/
    └── run.js              # Node test asserting the login button is responsive
```

## Prerequisites

- [Node.js](https://nodejs.org/) 14 or newer (developed against Node 22).
- npm, which ships with Node.js.

## Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd repo-test
npm install
```

There are no runtime or development dependencies, so `npm install` simply
resolves the empty dependency tree and creates/refreshes `package-lock.json`.

## Configuration

No configuration is required. The project reads no environment variables and has
no config files — cloning and running the test is enough.

## Usage

Run the test suite:

```bash
npm test
```

This executes `node test/run.js`, which reads `styles/login.css`, locates the
`.btn-primary` rule, and checks that the button does **not** use a fixed
multi-digit pixel width (for example `width: 400px`), which would overflow the
login card on narrow screens.

- If the rule still uses a fixed 3-digit pixel width, the test prints `FAIL` and
  exits non-zero — this is the initial state the pipeline is meant to fix.
- Once the width is made responsive, the test prints
  `PASS: login button width is responsive` and exits zero.

The `src/components/*.tsx` files are illustrative React components. This repo
does not include a bundler or dev server, so there is no `npm start`; the
components exist to give the pipeline realistic source to reason about.

## Contributing

- **Reporting an issue:** Search the existing issues first to avoid duplicates.
  If nothing matches, open a new issue with a clear description and the steps
  needed to reproduce it.
- **Submitting a pull request:** Fork the repository or create a branch, and
  keep your changes focused on a single concern. Reference the related issue in
  your PR description and open the pull request against the `main` branch.
