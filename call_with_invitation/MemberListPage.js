import React, {useRef, useState} from 'react';
import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import {ZegoStartCallInvitationButton} from '@zegocloud/zego-uikit-prebuilt-call-rn';
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
          <ZegoStartCallInvitationButton
            invitees={invitees}
            isVideoCall={false}
          />
          <ZegoStartCallInvitationButton
            invitees={invitees}
            isVideoCall={true}
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
