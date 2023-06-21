import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text, Image} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import JoinedScreen from '../screens/JoinedScreen';
import {icons} from '../theme/icons';
import NavStackHeader from '../components/NavComponents/NavStackHeader';
import DetailScreen from '../screens/DetailScreen';
import NavBackHeader from '../components/NavComponents/NavBackHeader';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const renderHeader = props => {
  return <NavStackHeader props={props} />;
};
const renderBackHeader = props => {
  return <NavBackHeader props={props} />;
};
const HomeStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Anasayfa',
          header: props => {
            return renderHeader(props);
          },
        }}></Stack.Screen>
      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{
          title: 'Detay',
          header: props => {
            return renderBackHeader(props);
          },
        }}></Stack.Screen>
    </Stack.Navigator>
  );
};

const mainNavigation = props => {
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            headerShown: false,
            tabBarStyle: {
              borderTopWidth: 0.3,
              borderTopColor: 'gray',
              borderWidth: 0.3,
              borderColor: 'gray',
              height: 90,
              borderTopLeftRadius: 18,
              borderTopRightRadius: 18,
            },

            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'gray',
            tabBarIcon: ({focused, color, size}) => {
              var icon = '';
              switch (route.name) {
                case 'HomeScreenn':
                  icon = icons.discoverIcon;
                  break;
                case 'Joined':
                  icon = icons.joinedIcon;

                  break;
                case 'Search':
                  icon = icons.portalIcon;

                  break;

                default:
                  break;
              }
              return (
                <Image
                  source={icon}
                  style={{
                    padding: 3,
                    tintColor: focused ? 'black' : 'gray',
                  }}></Image>
              );
            },
          })}>
          <Tab.Screen
            name="HomeScreenn"
            options={{
              title: 'KEŞFET',
              unmountOnBlur: true,
            }}
            component={HomeStackScreen}
          />
          <Tab.Screen
            name=" "
            options={{
              unmountOnBlur: true,
              tabBarIcon: () => (
                <Image style={{zIndex: 999}} source={icons.portalIcon} />
              ),
            }}
            component={HomeScreen}
          />
          <Tab.Screen
            name="Joined"
            options={{
              title: 'DAHA CÜZDAN',
              unmountOnBlur: true,
            }}
            component={JoinedScreen}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};
export default mainNavigation;
