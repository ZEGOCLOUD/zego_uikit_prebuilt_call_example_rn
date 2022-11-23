import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
// HomePage.js <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

export default function HomePage(props) {
  const pressHandle = () => {
    props.navigation.navigate('MemberListPage');
  };
  return (
    <View style={styles.container}>
      <Button title="Jump to member list page" onPress={pressHandle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
