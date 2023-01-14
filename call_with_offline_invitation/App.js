import React, { useState, useRef, useEffect } from 'react';
import {
  ZegoUIKitPrebuiltCallWithInvitation,
  ZegoSendCallInvitationButton,
  ZegoInvitationType,
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
  ONE_ON_ONE_VOICE_CALL_CONFIG,
  GROUP_VIDEO_CALL_CONFIG,
  GROUP_VOICE_CALL_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';

import ZegoUIKitSignalingPlugin from '@zegocloud/zego-uikit-signaling-plugin-rn';

import KeyCenter from './KeyCenter';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Platform,
  Switch,
} from 'react-native';
import { getDeviceId, getFirstInstallTime } from 'react-native-device-info'

export default function App(props) {
  const [invitees, setInvitees] = useState([]);
  const [zpnState, setZpnState] = useState("")
  const [showDeclineButton, setShowDeclineButton] = useState(true)
  const [userID, setUserID] = useState('')
  const [userName, setUserName] = useState('')

  const viewRef = useRef(null);
  const pressHandle = () => {
    viewRef.current.blur();
  };
  const changeTextHandle = value => {
    setInvitees(value ? value.split(',') : []);
  };

  useEffect(() => {
    getFirstInstallTime().then(firstInstallTime => {
      const id = String(firstInstallTime).slice(-5);
      setUserID(id)
      setUserName('user_' + id)
    })
  }, [])

  return (
    userName ? <ZegoUIKitPrebuiltCallWithInvitation
      appID={KeyCenter.appID}
      appSign={KeyCenter.appSign}
      userID={userID}
      userName={userName}
      ringtoneConfig={{
        incomingCallFileName: 'zego_incoming.mp3',
        outgoingCallFileName: 'zego_outgoing.mp3',
      }}
      plugins={[ZegoUIKitSignalingPlugin]} // The signaling plug-in used for call invitation must be set here. 
      requireConfig={(data) => {
        console.warn('requireConfig', data);
        const callConfig =
          data.invitees.length > 1
            ? ZegoInvitationType.videoCall === data.type
              ? GROUP_VIDEO_CALL_CONFIG
              : GROUP_VOICE_CALL_CONFIG
            : ZegoInvitationType.videoCall === data.type
              ? ONE_ON_ONE_VIDEO_CALL_CONFIG
              : ONE_ON_ONE_VOICE_CALL_CONFIG;
        return {
          ...callConfig,
        };
      }}
      notifyWhenAppRunningInBackgroundOrQuit={true}
      showDeclineButton={showDeclineButton}
      isIOSSandboxEnvironment={true}
      androidNotificationConfig={{
        channelID: "ZegoUIKit",
        channelName: "ZegoUIKit",
      }}
    >
      <TouchableWithoutFeedback onPress={pressHandle}>
        <View style={styles.container}>
          <Text>ZPNs message: {zpnState}</Text>
          <Text>Your userID: {userID}</Text>
          <Text>Your userName: user_{userID}</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={showDeclineButton ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => {
              setShowDeclineButton(!showDeclineButton)
            }}
            value={showDeclineButton}
          />
          <View style={styles.inputContainer}>
            <TextInput
              ref={viewRef}
              style={styles.input}
              onChangeText={changeTextHandle}
              placeholder="Invitees ID, Separate ids by ','"
            />
            <ZegoSendCallInvitationButton
              invitees={invitees.map((inviteeID) => {
                return { userID: inviteeID, userName: 'user_' + inviteeID };
              })}
              isVideoCall={false}
              resourceID={"zegouikit_call"}
            />
            <ZegoSendCallInvitationButton
              invitees={invitees.map((inviteeID) => {
                return { userID: inviteeID, userName: 'user_' + inviteeID };
              })}
              isVideoCall={true}
              resourceID={"zegouikit_call"}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ZegoUIKitPrebuiltCallWithInvitation> : null
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
});
