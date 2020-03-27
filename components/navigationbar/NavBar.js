import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfilePageScreen from '../profile/ProfilePageScreen';
import DiscoveryScreen from './components/discovery/DiscoveryScreen';
import PersonalScreen from '../personal/PersonalScreen';
import NotificationScreen from '../notification/NotificationScreen';
import PostScreen from '../post/PostScreen';

const AppTabs = createBottomTabNavigator();

export default function Tabs() {
  return (
    <NavigationContainer>
      <AppTabs.Navigator
        tabBarOptions={{
          activeTintColor: 'purple',
          inactiveTintColor: 'gray',
          showLabel: false,
        }}>
        <AppTabs.Screen
          name="Discovery"
          component={DiscoveryScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="ios-globe" size={30} color={color} />
            ),
          }}
        />
        {/* <AppTabs.Screen
            name = "PersonalScreen"
            component={PersonalScreen}
            options={{
              tabBarIcon: ({ color }) => (
                  <Icon name="ios-home" size={30} color= {color} />
              )
            }}
          /> */}
        <AppTabs.Screen
          name="Post"
          component={PostScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="ios-add-circle-outline" size={30} color={color} />
            ),
          }}
        />
        <AppTabs.Screen
          name="Notifications"
          component={NotificationScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="ios-notifications" size={30} color={color} />
            ),
          }}
        />
        <AppTabs.Screen
          name="Profile"
          component={ProfilePageScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="ios-person" size={30} color={color} />
            ),
          }}
        />
      </AppTabs.Navigator>
    </NavigationContainer>
  );
}
