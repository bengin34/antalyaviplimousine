# Lessons

Entry format: Symptom / Root cause / Detector / Applies when / Fix. Newest first.

## Navigation hooks imported from `@react-navigation/native` in an expo-router app

- **Symptom**: mobile crash at runtime (mamio, fixed in 18d7ac3, shipped 5.15.1).
- **Root cause**: suspected. `useFocusEffect` and other hooks imported straight from `@react-navigation/native` can resolve a different navigation package instance than the one expo-router mounts, so the hook runs outside the navigator context.
- **Detector**: `rg -n "from ['\"]@react-navigation/(native|core)['\"]" app src`
- **Verdict notes**: only hook imports (`useFocusEffect`, `useNavigation`, `useIsFocused`, `useRoute`) are the bug. `ThemeProvider`, `DefaultTheme`, `DarkTheme`, and `import type` are fine (berufDeutsch `app/_layout.tsx` is safe).
- **Applies when**: `expo-router` in `package.json`.
- **Fix**: import `useFocusEffect`, `useNavigation`, `useIsFocused`, etc. from `expo-router`. Enforce with ESLint `no-restricted-imports` on `@react-navigation/native`.
