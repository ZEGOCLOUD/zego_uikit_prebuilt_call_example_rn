/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import ZegoUIKitPrebuiltCallService from '@zegocloud/zego-uikit-prebuilt-call-rn';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';


ZegoUIKitPrebuiltCallService.useSystemCallingUI([ZIM, ZPNs]);

AppRegistry.registerComponent(appName, () => App);