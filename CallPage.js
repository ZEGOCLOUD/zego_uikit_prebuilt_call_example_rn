import React, { useEffect } from 'react';
import { useId } from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';
import ZegoUIKitPrebuiltCall from 'zego-uikit-prebuilt-call-rn';
// import ZegoUIKit, {ZegoToggleCameraButton} from @zego-uikit/components-rn
// import {ZegoUIKitPrebuiltCall} from @zego-uikit/prebuilt-call-rn

export default function CallPage(props) {
    const { route } = props;
    const { params } = route;
    const { userID, userName } = params;

    return (
        <View style={styles.container}>
            <ZegoUIKitPrebuiltCall
                appID={yourAppID}
                appSign='yourAppSign'
                userID={userID}
                userName={userName}
                callID='rn12345678'
                
                config={{
                    onHangUp: () => {props.navigation.navigate('HomePage')},
                    turnOnCameraWhenJoining: true,
                    menuBarButtons: [1, 2, 0, 4, 3],
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 0,
    },
});
