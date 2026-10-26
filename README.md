# Lazy King 👑

Cute Android-first parody game: earn Lazy Points, grow a virtual plant, and view a sample leaderboard.

## MVP status
- React Native + Expo app
- Plant growth stages and simulated Lazy Point actions
- Static leaderboard marked DEMO — NOT LIVE
- No authentication, backend, or real device tracking yet
- Hydration is not scored negatively; don't harm your health for points

## Windows setup
1. Install Node.js LTS: https://nodejs.org/
2. Open PowerShell in this folder.
3. Run:

```powershell
npm install
npx expo start
```

Install Expo Go on your Android phone, connect phone and PC to the same Wi-Fi, then scan the QR code. Alternatively, install Android Studio and an emulator and run `npx expo start --android`.

## Real tracking (future work)
- **App usage:** Android's `UsageStatsManager` requires the user to grant Usage Access in system settings. A native module or compatible library is needed. Expo Go cannot load arbitrary native modules; use an Expo development build when integrating it.
- **Steps:** consider Health Connect or a native step sensor with user permission. Missing data must not be treated as zero.
- **Alarms:** other apps' ignored alarms generally cannot be reliably monitored. Start with an in-app alarm or user-confirmed snooze.
- **Global leaderboard:** requires authentication, backend database, server-side scoring, event validation, and anti-cheat protections. Current scores are fictional placeholders.

The MVP buttons simulate usage signals; screen time, step count, and leaderboard scores are not real.
