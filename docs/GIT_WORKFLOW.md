# Git Workflow — Betinho BJJ Madrid

This document defines how changes reach `master`. It applies to every
contributor, human or AI assistant.

## Principles

- `master` is always stable and deployable.
- Nobody commits directly to `master`. Every change arrives through a Pull Request.
- One branch = one task. Keep Pull Requests small and focused.
- Existing work is never discarded: no reset, overwrite or forced checkout
  without explicit permission.

## Branch protection (GitHub)

`master` is protected on GitHub with:

| Rule | Setting |
|---|---|
| Pull Request required before merging | Enabled (0 approvals required — single maintainer) |
| Apply rules to administrators | Enabled |
| Force pushes | Blocked |
| Branch deletion | Blocked |
| Conversation resolution before merging | Required |

Required status checks will be added once CI exists.

## Branch naming

Format: `<type>/<short-kebab-case-description>`

| Prefix | Use for | Example |
|---|---|---|
| `feature/` | New functionality | `feature/local-seo` |
| `fix/` | Bug fixes | `fix/professor-rank` |
| `refactor/` | Code improvements without behavior change | `refactor/site-config` |
| `docs/` | Documentation | `docs/project-roadmap` |
| `chore/` | Maintenance, tooling, dependencies | `chore/update-deps` |
| `test/` | Automated tests | `test/contact-form` |

## Starting a task

```bash
git branch --show-current          # where am I?
git status                         # any uncommitted work? Stop and preserve it first.
git switch master
git pull --ff-only                 # fails safely if master has diverged
git switch -c <type>/<description>
```

If `git status` shows uncommitted changes that do not belong to the new task,
back them up first (`git diff > ../backup.patch`) and move them to their own
branch. Do not use `git stash` as long-term storage.

## Validation (before every commit)

All four checks must pass:

```bash
npx tsc -p tsconfig.app.json --noEmit
npx tsc -p tsconfig.node.json --noEmit
npm run lint
npm run build
```

Then review exactly what will be committed:

```bash
git diff --cached --name-only      # only the intended files?
git diff --cached                  # only the intended changes?
```

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <imperative summary, lower case, no period>

<optional body: what changed and why>
```

- `type` matches the branch prefix: `feat`, `fix`, `refactor`, `docs`, `chore`, `test`.
- `scope` is the area touched: `classes`, `gallery`, `footer`, `contact`, `seo`, `git`…
- Examples:
  - `feat(classes): add training locations and schedules`
  - `fix(professor): update BJJ rank to 4th degree`
  - `docs(git): add branching strategy and PR template`

Commit author for this repository: `Marcus Cruz <35490154+cruz2018@users.noreply.github.com>`
(set in the local repository config).

## Pull Request process

1. Push the branch only after the task owner approves:
   `git push -u origin <branch>`
2. Open a Pull Request targeting `master` and fill in the template
   (`.github/pull_request_template.md`).
3. Review the diff on GitHub, resolve all conversations.
4. Merge with **Squash and merge** — one clean commit per task on `master`.
5. Delete the branch only after approval.
6. Update local `master`: `git switch master && git pull --ff-only`.

## Never

- Commit or push directly to `master`.
- Force-push to `master` (`git push --force`).
- Merge automatically or without review.
- Run destructive commands without explicit permission:
  `git reset --hard`, `git clean -f`, `git checkout -- .`, `git restore .`,
  `git branch -D`, `git push --delete`.

## Recovering lost work

- `git reflog` lists every position `HEAD` has been at — commits are
  recoverable from there even after a bad reset.
- Before any risky operation, save a patch outside the repository:
  `git diff > ../backup-$(date +%F).patch`, and restore it with `git apply`.
