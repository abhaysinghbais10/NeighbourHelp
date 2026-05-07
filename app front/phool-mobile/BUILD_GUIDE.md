# Generating Android App Bundle (.aab)

To create an Android App Bundle for the Google Play Store, we use **EAS Build** (Expo Application Services).

### 1. Prerequisites
Ensure you have the EAS CLI installed globally:
```bash
npm install -g eas-cli
```

### 2. Login to Expo
Log in to your Expo account:
```bash
eas login
```

### 3. Configure the Project
Initialize the EAS configuration for your project (this will create an `eas.json` file):
```bash
eas build:configure
```

### 4. Update app.json (Completed)
I have already updated your `app.json` with a unique package name: `"com.ankitaanshul.phoolbasket"`. This is required for Android builds.

### 5. Run the Build
Run the following command to start the build process on Expo's servers:
```bash
eas build --platform android --profile production
```
*Note: This will generate a `.aab` file by default for the production profile.*

### 6. Download the Bundle
Once the build is finished, the terminal will provide a link to download the `.aab` file from your Expo dashboard.

---

### Alternative: Local Build (Advanced)
If you prefer to build locally (requires Android Studio and Java installed):
```bash
npx expo run:android --variant release
```
*This will create an APK/AAB on your local machine in the `android/app/build/outputs` folder.*
