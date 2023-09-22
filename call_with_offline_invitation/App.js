import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Image, } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import KeyCenter from './KeyCenter';
import { getFirstInstallTime } from 'react-native-device-info'
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';

import ZegoUIKitPrebuiltCallService, {
  ZegoCallInvitationDialog,
  ZegoUIKitPrebuiltCallWaitingScreen,
  ZegoUIKitPrebuiltCallInCallScreen,
  ZegoSendCallInvitationButton,
  ZegoUIKitPrebuiltCallFloatingMinimizedView,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';

import {
  ZegoLeaveButton,
  ZegoSwitchAudioOutputButton,
  ZegoSwitchCameraButton,
  ZegoToggleCameraButton,
  ZegoToggleMicrophoneButton,
  ZegoViewPosition,
} from '@zegocloud/zego-uikit-rn'

const Stack = createNativeStackNavigator();


const storeUserInfo = async (info) => {
  await AsyncStorage.setItem("userID", info.userID)
  await AsyncStorage.setItem("userName", info.userName)
}
const getUserInfo = async () => {
  try {
    const userID = await AsyncStorage.getItem("userID")
    const userName = await AsyncStorage.getItem("userName")
    if (userID == undefined) {
      return undefined
    } else {
      return { userID, userName }
    }
  } catch (e) {
    return undefined
  }
}

const onUserLogin = async (userID, userName, props) => {
  return ZegoUIKitPrebuiltCallService.init(
    KeyCenter.appID,
    KeyCenter.appSign,
    userID,
    userName,
    [ZIM, ZPNs],
    {
      ringtoneConfig: {
        incomingCallFileName: 'zego_incoming.mp3',
        outgoingCallFileName: 'zego_outgoing.mp3',
      },
      notifyWhenAppRunningInBackgroundOrQuit: true,
      isIOSSandboxEnvironment: true,
      androidNotificationConfig: {
        channelID: "ZegoUIKit",
        channelName: "ZegoUIKit",
      },
      requireConfig: (data) => {
        return {
          onHangUp: (duration) => {
            console.log('########CallWithInvitation onHangUp', duration);
            props.navigation.navigate('HomeScreen');
          },
          timingConfig: {
            enableTiming: true,
            onDurationUpdate: (duration) => {
              console.log('########CallWithInvitation onDurationUpdate', duration);
              if (duration === 10 * 60) {
                ZegoUIKitPrebuiltCallService.hangUp(true);
              }
            }
          },
          layout: {
            config: {
              smallViewBorderRadius: 10,
              smallViewPostion: ZegoViewPosition.topRight,
              smallViewSize: { width: 120, height: 180 },
            }
          },
          topMenuBarConfig: {
            buttons: [ ],
          },
          bottomMenuBarConfig: {
            buttons: [ ],
          },
          foregroundBuilder: () =>  {
            return (
              <View style={foregroundStyles.container} pointerEvents={'box-none'}>
                <TouchableOpacity
                  style={foregroundStyles.chatButton}
                  onPress={() => {
                    console.log('Chat Button Pressed.');
                  }}>
                  <Image
                    resizeMode='contain' 
                    source={require('./resources/white_bottom_button_message.png')} 
                    style={{ width: "100%", height: "100%" }} 
                  />
                </TouchableOpacity>
                <View style={foregroundStyles.bottomView}>
                  <ZegoToggleCameraButton isOn={true} 
                    iconCameraOn={require('./resources/white_button_camera_on.png')} 
                    iconCameraOff={require('./resources/white_button_camera_off.png')} 
                  />
                  <ZegoSwitchCameraButton 
                    iconFrontFacingCamera={require('./resources/white_button_flip_camera.png')}
                    iconBackFacingCamera={require('./resources/white_button_flip_camera.png')} 
                  />
                  <ZegoLeaveButton 
                    iconLeave={require('./resources/white_button_hang_up.png')}
                    onPressed={() => {
                      props.navigation.navigate('HomeScreen');
                  }}
                  />
                  <ZegoToggleMicrophoneButton isOn={true}
                    iconMicOn={require('./resources/white_button_mic_on.png')}
                    iconMicOff={require('./resources/white_button_mic_off.png')}
                  />
                  <ZegoSwitchAudioOutputButton useSpeaker={true}
                    iconSpeaker={require('./resources/white_button_speaker_on.png')}
                    iconEarpiece={require('./resources/white_button_speaker_off.png')}
                    iconBluetooth={require('./resources/white_button_bluetooth_off.png')}
                  />
                </View>
              </View>
            );
          },
        }
      }
    }
  );
}

const foregroundStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  bottomView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    alignItems: 'center',
    position: 'absolute',
    height: 120,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'lightblue'
  },
  chatButton: {
    position: 'absolute',
    width: 48,
    height: 48,
    left: 50,
    bottom: 150,
  },
});

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Step 1: Config React Navigation
export default function App() {
  return (
    <NavigationContainer >

      <ZegoCallInvitationDialog />

      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          // DO NOT change the name 
          name="ZegoUIKitPrebuiltCallWaitingScreen"
          component={ZegoUIKitPrebuiltCallWaitingScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          // DO NOT change the name
          name="ZegoUIKitPrebuiltCallInCallScreen"
          component={ZegoUIKitPrebuiltCallInCallScreen}
        />

      </Stack.Navigator>
      <ZegoUIKitPrebuiltCallFloatingMinimizedView />
    </NavigationContainer>);
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Step 2: Call "ZegoUIKitPrebuiltCallService.init" method after the user login.
function LoginScreen(props) {
  const navigation = useNavigation();
  const [userID, setUserID] = useState('');
  const [userName, setUserName] = useState('');

  const loginHandler = () => {
    // Simulated login successful

    // Store user info to auto login
    storeUserInfo({ userID, userName })

    // Init the call service
    onUserLogin(userID, userName, props).then(() => {
      // Jump to HomeScreen to make new call
      navigation.navigate('HomeScreen', { userID });
    })
  }

  useEffect(() => {
    getFirstInstallTime().then(firstInstallTime => {
      const id = String(firstInstallTime).slice(-5);
      setUserID(id);
      const name = 'user_' + id
      setUserName(name);
    });
  }, [])

  return <View style={styles.container}>
    <View style={{ marginBottom: 30 }}>
      <Text>appID: {KeyCenter.appID}</Text>
      <Text>userID: {userID}</Text>
      <Text>userName: {userName}</Text>
    </View>
    <View style={{ width: 160 }}>
      <Button title='Login' onPress={loginHandler}></Button>
    </View>
  </View>;
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Step 3: Configure the "ZegoSendCallInvitationButton" to enable making calls. 
function HomeScreen(props) {
  const [userID, setUserID] = useState('')
  const [invitees, setInvitees] = useState([]);
  const viewRef = useRef(null);
  const blankPressedHandle = () => {
    viewRef.current.blur();
  };
  const changeTextHandle = value => {
    setInvitees(value ? value.split(',') : []);
  };


  useEffect(() => {
    // Simulated auto login if there is login info cache
    getUserInfo().then((info) => {
      if (info) {
        setUserID(info.userID)
        onUserLogin(info.userID, info.userName, props)
      } else {
        //  Back to the login screen if not login before
        props.navigation.navigate('LoginScreen');
      }
    })
  }, [])

  return (
    <TouchableWithoutFeedback onPress={blankPressedHandle}>
      <View style={styles.container}>
        <Text>Your user id: {userID}</Text>
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
            resourceID={"zego_data"}
          />
          <ZegoSendCallInvitationButton
            invitees={invitees.map((inviteeID) => {
              return { userID: inviteeID, userName: 'user_' + inviteeID };
            })}
            isVideoCall={true}
            resourceID={"zego_data"}
          />
        </View>
        <View style={{ width: 220, marginTop: 100 }}>
          <Button title='Back To Login Screen' onPress={() => { props.navigation.navigate('LoginScreen') }}></Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "gray"
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