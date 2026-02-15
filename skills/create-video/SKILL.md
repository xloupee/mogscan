---
name: create-video
description: Scaffold a new video project using `npx create-video@latest`. Use when a user asks to create, bootstrap, or initialize a video project/template with the `create-video` CLI, including handling interactive prompts, choosing a target folder, installing dependencies, and preparing first-run commands.
---

# Create Video

Run `npx create-video@latest` reliably and set up a usable project in one pass.

## Workflow

1. Confirm the target directory.
2. Run the scaffold command from the requested parent directory.
3. Handle interactive prompts in a PTY session.
4. Verify generated files (`package.json`, source folders, config files).
5. Install dependencies if the generator did not install them.
6. Report exact next commands (`npm run dev`, `npm run build`, etc.).

## Command Pattern

Use this default pattern:

```bash
npx create-video@latest
```

If the user requested a specific directory, run from the parent and provide/enter that directory name in prompts.

## Prompt Handling

When prompts appear, prefer:

- Project name: user-provided name (or current request name)
- Package manager: match existing workspace preference if obvious; otherwise npm
- Template: ask user if multiple materially different templates are offered
- Install dependencies: yes
- Initialize git: follow user preference; default yes if not specified

If a prompt is unclear or high-impact, ask one concise question before continuing.

## Verification

After scaffolding, check:

- Project folder exists
- `package.json` exists
- Dependency install status
- Dev/build scripts available

Then provide:

- Created path
- Selected options
- Any warnings/errors
- Exact run command(s)

## Guardrails

- Do not overwrite existing project folders without explicit user confirmation.
- Prefer non-destructive actions if a folder already exists (new folder name or stop and ask).
- Keep generated output scoped to the requested location.
