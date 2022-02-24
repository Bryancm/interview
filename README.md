# interview
Board game for Enara coding challenge

## Tech Stack

- [React Native](https://reactnative.dev)
- [React-Native-Linear-Gradient](https://github.com/react-native-linear-gradient/react-native-linear-gradient)

## Folder Structure

The project was initialized with the [React Native CLI](https://reactnative.dev/docs/environment-setup) and the [react-native-template-typescript](https://github.com/react-native-community/react-native-template-typescript)
so most of the files and folders belongs to the template, but the code of the challenge are in the next files:

    ├── components/TileButton.tsx      
    ├── App.tsx                
    └── Colors.ts

## Installation

- Dependencies
 
 The project was initialized with Node v16.13.2 
 
  ```bash
  npm install
  
  ```

- iOS
```bash  //iOS
  // after installing dependencies  
  cd ios
  pod install
  cd ..
  npm run ios // run on ios simulator
```
If you are getting the error 'Could not find proper version of cocoapods' when you run the 'pod install' command you can run the command:

```bash
  bundle install
  // then try to run the pod install command again
```

- Android

```bash
   // after installing dependencies
   npm run android // run on android simulator
```

- If the screen of the android simulator is black check if it is not locked
- If the app keeps showing a blank screen you can close the app on the android simulator and open it again

