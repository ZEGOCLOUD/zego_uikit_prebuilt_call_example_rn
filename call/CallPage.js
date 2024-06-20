import React, { useRef } from 'react';

import { StyleSheet, View, Text, Button, Image } from 'react-native';
import ZegoUIKitPrebuiltCallService, {
    ZegoUIKitPrebuiltCall,
    ONE_ON_ONE_VIDEO_CALL_CONFIG,
    ONE_ON_ONE_VOICE_CALL_CONFIG,
    ZegoMenuBarButtonName,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import KeyCenter from "./KeyCenter";

export default function CallPage(props) {
    const prebuiltRef = useRef();
    const { route } = props;
    const { params } = route;
    const { userID, userName } = params;

    return (
        <View style={styles.container}>
            <ZegoUIKitPrebuiltCall
                ref={prebuiltRef}
                appID={KeyCenter.appID}
                appSign={KeyCenter.appSign}
                userID={userID}
                userName={userName}
                callID='rn12345678'
                
                config={{
                    // ...ONE_ON_ONE_VOICE_CALL_CONFIG,
                    ...ONE_ON_ONE_VIDEO_CALL_CONFIG,

                    avatarBuilder: ({userInfo}) => {
                      return <View style={{width: '100%', height: '100%'}}>
                       <Image
                        style={{ width: '100%', height: '100%' }}
                        resizeMode="cover"
                        source={{ uri: `https://robohash.org/${userInfo.userID}.png` }}
                        />
                      </View>
                    },
                    onCallEnd: (callID, reason, duration) => {
                        console.log('########CallPage onCallEnd');
                        props.navigation.navigate('HomePage');
                    },
                    timingConfig: {
                      isDurationVisible: true,
                      onDurationUpdate: (duration) => {
                        console.log('########CallWithInvitation onDurationUpdate', duration);
                        if (duration === 10 * 60) {
                          ZegoUIKitPrebuiltCallService.hangUp();
                        }
                      }
                    },
                    topMenuBarConfig: {
                        buttons: [
                            ZegoMenuBarButtonName.minimizingButton,
                        ],
                    },
                    onWindowMinimized: () => {
                        console.log('[Demo]CallPage onWindowMinimized');
                        props.navigation.navigate('HomePage');
                    },
                    onWindowMaximized: () => {
                        console.log('[Demo]CallPage onWindowMaximized');
                        props.navigation.navigate('CallPage', {
                            userID: userID,
                            userName: userName,
                            callID: 'rn12345678',
                        });
                    },
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
