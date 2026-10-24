/**
 * Shared vitest setup.
 *
 * Testing Library waits one second by default for `findBy*` and `waitFor`.
 * That is generous on a laptop and tight on a loaded CI runner, where React
 * flushing an effect a tick late is enough to fail a build: the Land of
 * Legends confirmation and the profit-distribution panel each broke a deploy
 * that way while passing locally every time. Five seconds costs nothing on a
 * passing run - the wait ends as soon as the assertion holds - and only makes
 * a genuinely failing test take longer to say so.
 *
 * The import is guarded because this file also runs for the node-environment
 * tests, which have no DOM for Testing Library to configure.
 */
if (typeof document !== "undefined") {
  const { configure } = await import("@testing-library/dom");
  configure({ asyncUtilTimeout: 5000 });
}
