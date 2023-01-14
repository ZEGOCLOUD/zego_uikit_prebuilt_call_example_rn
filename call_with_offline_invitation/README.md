# Run the example

## Install dependencies

```bash
yarn install
```

## Set appid and appsign

You can get appid and appsign from [ZEGOCLOUD's Console](https://console.zegocloud.com/account/login). Then, open `KeyCenter.js` file and set the appid and appsign.

## Rename the package and bundle id

1. react-native-rename ZegoCall -b com.your.packagename
2. If you need to build the iOS app, then you need to set the bundle id on Xcode manually

## Config your project to enable offline call invitation

If you want to receive call invitation notifications, do the following: 
1. Click the button below to contact ZEGOCLOUD Technical Support.

    <a href="https://discord.gg/ExaKJvBbxy">
    <img src="https://img.shields.io/discord/980014613179555870?color=5865F2&logo=discord&logoColor=white" alt="ZEGOCLOUD"/>
</a>

2. Then, follow the instructions in the video below.

- iOS:

[![Watch the video](https://storage.zego.im/sdk-doc/Pics/ZegoUIKit/videos/how_to_enable_offline_call_invitation_ios.png)](https://youtu.be/rzdRY8bDqdo)

Resource may help: [Apple Developer](https://developer.apple.com)

- Android:
  
[![Watch the video](https://storage.zego.im/sdk-doc/Pics/ZegoUIKit/videos/how_to_enable_offline_call_invitation_android.png)](https://youtu.be/mhetL3MTKsE)

## Run on devices

1. Android
```bash
yarn android
```
2. iOS
```bash
yarn ios
```
