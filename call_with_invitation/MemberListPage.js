import React, { useRef, useState } from 'react';
import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import { ZegoSendCallInvitationButton } from '@zegocloud/zego-uikit-prebuilt-call-rn';
// MemberListPage.js <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

export default function MemberListPage(props) {
  const [invitees, setInvitees] = useState([]);
  const viewRef = useRef(null);
  const pressHandle = () => {
    viewRef.current.blur();
  };
  const changeTextHandle = value => {
    setInvitees(value ? value.split(',') : []);
  };
  const willPressedHandle = () => {
    // Block the method of sending an invitation
    // If true is returned, it will be sent
    // If false is returned, it will not be sent
  
    // Your code...

    // Synchronization example
    // return true;
    
    // Asynchronous example, an asynchronous method is simulated here
    return new Promise((resolve, reject) => {
      resolve(true);
    })
  }

  return (
    <TouchableWithoutFeedback onPress={pressHandle}>
      <View style={styles.container}>
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
            onWillPressed={willPressedHandle}
          />
          <ZegoSendCallInvitationButton
            invitees={invitees.map((inviteeID) => {
              return { userID: inviteeID, userName: 'user_' + inviteeID };
            })}
            isVideoCall={true}
            onWillPressed={willPressedHandle}
          />
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
