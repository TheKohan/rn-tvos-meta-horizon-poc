# React Native tvOS with Horizon OS support

This repo is a PoC on how to add Horizon OS support to your existing rn-tvOS app.

#### Running the app

- For TV development:

```sh
yarn
yarn prebuild:tv # Executes clean Expo prebuild with TV modifications
yarn ios # Build and run for Apple TV
yarn android # Build for Android TV
```

- For Quest:

```sh
yarn
yarn prebuild # Executes Expo prebuild with no TV modifications
yarn quest # Build and run for iOS
```

#### Notable changes

- added `expo-horizon-os` package + plugin that add aditional flavor for building android and some utilities
- navigation on TV is handled by `TVFocusGuideView`, on Quest it is handled simmilar to web by utilizing `onHoverIn`
- different `Pressable` component for both platforms (seems like `react-native-gesture-handler` `Pressable` is not working with `tvOS`)
- additional custom non-header `back button` in UI for more clear feedback on Quest.
