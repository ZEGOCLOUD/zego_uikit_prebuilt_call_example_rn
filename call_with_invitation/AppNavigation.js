import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePage from './HomePage';
import MemberListPage from './MemberListPage';

const Stack = createNativeStackNavigator();

export default function AppNavigation(props) {
  return (
    <Stack.Navigator initialRouteName="HomePage">
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="MemberListPage" component={MemberListPage} />
    </Stack.Navigator>
  );
}
