/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import ZegoUIKitPrebuiltCallService from '@zegocloud/zego-uikit-prebuilt-call-rn';
import ZegoUIKitSignalingPlugin from '@zegocloud/zego-uikit-signaling-plugin-rn';

ZegoUIKitPrebuiltCallService.useSystemCallingUI(ZegoUIKitSignalingPlugin);

AppRegistry.registerComponent(appName, () => App);
