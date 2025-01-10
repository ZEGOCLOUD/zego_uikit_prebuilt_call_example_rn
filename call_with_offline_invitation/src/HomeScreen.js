import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info'
import Orientation from 'react-native-orientation-locker';

import ZegoUIKit, { ZegoToast, ZegoToastType } from '@zegocloud/zego-uikit-rn'
import ZegoUIKitPrebuiltCallService, { ZegoSendCallInvitationButton } from '@zegocloud/zego-uikit-prebuilt-call-rn';

import { onUserLogin } from './common';

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Step 3: Configure the "ZegoSendCallInvitationButton" to enable making calls. 
export default function HomeScreen(props) {
    const [userID, setUserID] = useState('')
    const [invitees, setInvitees] = useState([]);
    const viewRef = useRef(null);
    const [isToastVisable, setIsToastVisable] = useState(false);
    const [toastExtendedData, setToastExtendedData] = useState({});  
    const toastInvisableTimeoutRef = useRef(null);

    const blankPressedHandle = () => {
      viewRef.current.blur();
    };
    const changeTextHandle = value => {
      let filteredList = value.split(',').map(item => item.trim()).filter(item => item !== '')
      setInvitees(filteredList);
    };
  
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
    
    const resetToastInvisableTimeout = () => {
      clearTimeout(toastInvisableTimeoutRef.current)
      toastInvisableTimeoutRef.current = setTimeout(() => {
        setIsToastVisable(false)
      }, 3 * 1000);
    }

    useEffect(() => {
      Orientation.addOrientationListener((orientation) => {
        var orientationValue = 0;
        if (orientation === 'PORTRAIT') {
          orientationValue = 0;
        } else if (orientation === 'LANDSCAPE-LEFT') {
          orientationValue = 1;
        } else if (orientation === 'LANDSCAPE-RIGHT') {
          orientationValue = 3;
        }
        console.log('+++++++Orientation+++++++', orientation, orientationValue);
        ZegoUIKit.setAppOrientation(orientationValue);
      });
  
      // Simulated auto login if there is login info cache
      getUserInfo().then((info) => {
        if (info) {
          setUserID(info.userID)
          onUserLogin(info.userID, info.userName, props)
        } else {
          // Back to the login screen if not login before
          props.navigation.navigate('LoginScreen');
        }
      })
    }, [])
  
    useFocusEffect(
      React.useCallback(() => {
          getUserInfo().then((info) => {
              if (info) {
                setUserID(info.userID)
              }
          })
          
          return () => {
          };
      }, [])
    );
  
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
              showWaitingPageWhenGroupCall={true}
              onPressed={ (errorCode, errorMessage, errorInvitees) => {
                if (errorCode == 0) {
                  clearTimeout(toastInvisableTimeoutRef.current)
                  setIsToastVisable(false)
                } else {
                  setIsToastVisable(true)
                  setToastExtendedData({type: ZegoToastType.error, text: `error: ${errorCode}\n\n${errorMessage}`})
                  resetToastInvisableTimeout()
                }
              }}
            />
            <ZegoSendCallInvitationButton
              invitees={invitees.map((inviteeID) => {
                return { userID: inviteeID, userName: 'user_' + inviteeID };
              })}
              isVideoCall={true}
              resourceID={"zego_data"}    
              showWaitingPageWhenGroupCall={true}
              onPressed={ (errorCode, errorMessage, errorInvitees) => {
                if (errorCode == 0) {
                  clearTimeout(toastInvisableTimeoutRef.current)
                  setIsToastVisable(false)
                } else {
                  setIsToastVisable(true)
                  setToastExtendedData({type: ZegoToastType.error, text: `error: ${errorCode}\n\n${errorMessage}`})
                  resetToastInvisableTimeout()
                }
              }}
            />
          </View>
          <View style={{ width: 220, marginTop: 100 }}>
            <Button title='Back To Login Screen' onPress={() => { 
              props.navigation.navigate('LoginScreen')
              ZegoUIKitPrebuiltCallService.uninit();
            }}></Button>
          </View>
          <View style={{ marginTop: 30 }}>
            <Text>App Version: {DeviceInfo.getVersion()}.{DeviceInfo.getBuildNumber()}</Text>
          </View>
          <ZegoToast
            visable={isToastVisable}
            type={toastExtendedData.type}
            text={toastExtendedData.text}
          />
        </View>
      </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A3A3A3'
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