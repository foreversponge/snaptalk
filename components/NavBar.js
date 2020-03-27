import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfilePageScreen from './ProfilePageScreen';
import HomeScreen from './HomeScreen';
import NotificationScreen from './NotificationScreen';
import PostScreen from './PostScreen';

const AppTabs = createBottomTabNavigator();

export default function Tabs() {
  return (
    <NavigationContainer>
      <AppTabs.Navigator
        tabBarOptions={{
          activeTintColor: 'purple',
          inactiveTintColor: 'gray',
          showLabel: false
        }}
      >
        <AppTabs.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="ios-home" size={30} color={color} />
            )
          }}
        />
        <AppTabs.Screen
          name="Post"
          component={PostScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="ios-add-circle-outline" size={30} color={color} />
            )
          }}
        />
        <AppTabs.Screen
          name="Notifications"
          component={NotificationScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="ios-notifications" size={30} color={color} />
            ),
          }}
        />
        <AppTabs.Screen
          name="Profile"
          component={ProfilePageScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="ios-person" size={30} color={color} />
            )
          }}
        />
      </AppTabs.Navigator>
    </NavigationContainer>

  );

}
