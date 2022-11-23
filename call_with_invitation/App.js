import React from 'react';
import {
  ZegoUIKitPrebuiltCallWithInvitation,
  ZegoInvitationType,
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
  ONE_ON_ONE_VOICE_CALL_CONFIG,
  GROUP_VIDEO_CALL_CONFIG,
  GROUP_VOICE_CALL_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import ZegoUIKitSignalingPlugin from '@zegocloud/zego-uikit-signaling-plugin-rn';
import {Alert} from 'react-native';
import AppNavigation from './AppNavigation';

const userID = String(Math.floor(Math.random() * 10000));
const userName = `user_${userID}`;

export default function CallWithInvitationPage(props) {
  return (
    <ZegoUIKitPrebuiltCallWithInvitation
      appID={yourAppID}
      appSign="yourAppSign"
      userID={userID}
      userName={userName}
      ringtoneConfig={{
        incomingCallFileName: 'zego_incoming.mp3',
        outgoingCallFileName: 'zego_outgoing.mp3',
      }}
      requireConfig={data => {
        console.warn('requireConfig', data);
        const config =
          data.invitees.length > 1
            ? ZegoInvitationType.videoCall === data.type
              ? GROUP_VIDEO_CALL_CONFIG
              : GROUP_VOICE_CALL_CONFIG
            : ZegoInvitationType.videoCall === data.type
            ? ONE_ON_ONE_VIDEO_CALL_CONFIG
            : ONE_ON_ONE_VOICE_CALL_CONFIG;
        return {
          ...config,
          onHangUp: () => {
            // Custom
          },
          onOnlySelfInRoom: () => {
            // Custom
          },
          onHangUpConfirmation: () => {
            return new Promise((resolve, reject) => {
              Alert.alert('Leave the call', 'Are your sure to leave the call', [
                {
                  text: 'Cancel',
                  onPress: () => {
                    reject();
                  },
                  style: 'cancel',
                },
                {
                  text: 'Confirm',
                  onPress: () => {
                    resolve();
                  },
                },
              ]);
            });
          },
        };
      }}
      plugins={[ZegoUIKitSignalingPlugin]}>
      <AppNavigation />
    </ZegoUIKitPrebuiltCallWithInvitation>
  );
}
