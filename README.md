<div>
  <img align="right" width="35%" src="./src/assets/images/screenshot.png">
</div>

<div align="center">
    <h1><img align="center" src="./src/assets/images/icon.png" style="border-radius: 4px; height: 50px; margin-right: 10px;" /> Paletti</h1>

<a align="center" href="https://apps.apple.com/app/paletti/id6447082774"><img align="center" src="./src/assets/images/apple_store.svg" height="52" /></a>

</div>

Paletti is an intuitive app designed to help you capture and save the colors around you. By simply scanning your surroundings, Paletti allows you to instantly view and save the colors you discover, along with their corresponding names and hex codes. Whether you're a designer or just love colors, Paletti is the perfect tool for exploring the world of color.

### Features

- Scan your surroundings to create palettes from colors around you.
- Generate palettes from your saved images.
- Organize colors by creating multiple palettes
- Sync your palette collection across all your devices using your iCloud account.
- Capture and save screenshots of your palettes and palette collection.
- Share color collection with others on various social media and messaging apps.
- Access Paletti's features through a simple and intuitive interface.

## Try it!

Download the repository and run the following commands to try **Paletti** for yourself:

### iOS

```sh
yarn setup
```

## Project structure

This is a bare React Native project, created with [`npx react-native init`](https://reactnative.dev/docs/environment-setup#creating-a-new-application).

---

- 📁 `src`: Contains the actual TypeScript + React (-Native) front-end for the Paletti App.
  - 📄 `src/utils/pixelColor.ts`: This is a JS wrapper for the native iOS `PixelColor` module.
  - 📄 `src/utils/getColor.ts`: This exposes a JS function with TypeScript types that utilizes the native iOS frame processor plugin.
  - 📄 `src/App.tsx`: This serves as the primary navigator, directing users to either the Splash Screen (Permissions) or the primary app screen, depending on their permission status.
  - 📁 `src/screens/Splash`: This directory contains the code for the Splash screen, which prompts the user for permission to use their camera.
  - 📁 `src/screens/Eyedropper`: This is the primary app screen where users can use their device's camera to view colors in their surroundings and save them.
  - 📁 `src/screens/Palettes`: Contains the code for the Palettes screen where users can view their collection of saved palettes and perform actions on them such as renaming, deleting, and exporting.
  - 📁 `src/screens/Settings`: Over here, users can customize their experience with their preferred settings such as theme, sound, and more.

---

- 📁 `ios`: Contains the basic skeleton for a React Native iOS app, plus the native `getColor()` Frame Processor Plugin.
  - 📄 `ios/PixelColor.m`: Exports the native methods of the `PixelColor` module to JavaScript.
  - 📄 `ios/PixelColor.swift`: Contains the actual Swift code for the native iOS `PixelColor` module.
  - 📄 `ios/PaletteFrameProcessorPlugin.m`: Declares the Swift frame processor plugin "`getColor()`".
  - 📄 `ios/PaletteFrameProcessorPlugin.swift`: Contains the actual Swift code for the native iOS frame processor plugin "`getColor()`".
  - 📄 `ios/Paletti-Bridging-Header.h`: A Bridging Header to import Objective-C headers into Swift.
  - 📄 `ios/Podfile`: Adds libraries such as [`UIImageColors`](https://github.com/jathu/UIImageColors)

---

- 📄 `babel.config.js`: Adds the native frame processor plugin `getColor` (called `__getColor`) to Reanimated's `global` list.

## Credits

- [**Dimest**](https://dribbble.com/Dimest) and [**ColorSlurp**](https://colorslurp.com) for design inspirations
- [**react-native-reanimated**](https://github.com/software-mansion/react-native-reanimated) for allowing JS code to be dispatched to another Runtime (Worklets)
- [**Colorwaver**](https://github.com/mrousavy/Colorwaver) mobile app for providing inspiration and guidance in building some of the color-related functionality.
- [**react-native-vision-camera**](https://github.com/mrousavy/react-native-vision-camera) for allowing you to run JS code on a realtime feed of Camera Frames (Frame Processors)
- **You guys** for the downloads, ratings and feedbacks.
