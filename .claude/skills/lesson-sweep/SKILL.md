---
name: lesson-sweep
description: Turn a fixed bug (crash, build failure, regression) into a reusable lesson, then check the user's other apps for the same bug. Use when the user says "learn from this fix", "check the other apps for this", "hatalardan öğren", "diğer app'lerde de kontrol et", or after a crash/build fix lands.
---

A bug fixed in one app usually exists in the sibling apps. Turn the fix into a lesson, search every app for it, then make the repo catch it automatically from now on.

## Steps

1. **Find the fix.** Use what the user names (commit, PR, file). Otherwise read the source repo's recent `git log` and pick the commits that fix a crash, build failure, or regression. Read the diff, not just the message.

2. **Write the lesson.** Add an entry to [`lessons.md`](lessons.md) in this skill's folder, using the entry format there. Every entry needs:
   - **Symptom**: what the user saw.
   - **Root cause**: why it happened. If the diff alone doesn't prove it, say "suspected".
   - **Detector**: a grep/ripgrep pattern that finds the bad code. Test it against the pre-fix commit (must hit) and the fixed tree (must not hit).
   - **Applies when**: stack conditions (Expo SDK, library and version, platform).
   - **Fix**: the one-line rule.

3. **Sweep the other apps.** Repos live next to the source repo (`/home/user/*`) unless the user names others. For each:
   - Check **Applies when** first (`package.json`, lockfile, `app.json`). Mark non-applicable repos "n/a" with the reason.
   - Run the detector. Read each hit; a grep match is a candidate, not a finding.
   - Also run every older entry in `lessons.md` that applies. The sweep is cheap and old lessons rot silently.

4. **Report.** One table: repo, lesson, hit count, verdict (bug / safe / n/a). List file:line for each bug. Do not edit repos yet.

5. **Fix on request.** On a branch per repo, apply the fix and run the repo's own typecheck/tests. Open PRs only when the user asks.

6. **Make it deterministic.** If the lesson is a mechanical pattern (banned import, banned API), propose a lint rule such as ESLint `no-restricted-imports` instead of relying on this skill. Follow the `retro` skill's rule: build the check, don't just write a rule.

## Rules

- Do not mark a repo clean without running the detector in it.
- Do not generalize beyond the evidence. A lesson from one expo-router crash is not a rule about all navigation code.
- Keep `lessons.md` short. Delete lessons whose detector is now enforced by lint in every repo.
