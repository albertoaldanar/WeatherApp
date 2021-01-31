import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/FontAwesome';
import LocationSearch from '../pages/locationSearch';
import Map from '../pages/map';
import Bookmarks from '../pages/bookmarks';
import Home from '../pages';
import CityDescription from '../pages/cityDescription';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// function MyTabs() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           if (route.name === 'Interacción') {
//             iconName = focused
//               ? 'phone'
//               : 'phone';
//           } else if (route.name === 'Actividad') {
//             iconName = focused ? 'history' : 'history';
//           }
//           else if (route.name === 'Admin') {
//             iconName = focused ? 'user' : 'user';
//           }

//           // You can return any component that you like here!
//           return <Icon name={iconName} size={20} color={color} />;
//         },
//       })}
//       tabBarOptions={{
//         activeTintColor: '#03b388',
//         inactiveTintColor: '#dcdcdc',
//         paddingBottom: 20,
//         labelStyle: {
//           fontSize: 12,
//         },
//       }}
//     >
//       <Tab.Screen name="Interacción"  component={Interactions}/>
//       <Tab.Screen name="Admin" component={Admin} />
//     </Tab.Navigator>
//   );
// }

function AppWeatherNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen 
          name="LocationSearch" 
          component={LocationSearch} 
          options={{header: () => null}}
        />
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{header: () => null}}
        />

        {/* <Stack.Screen
          name="Index"
          component={MyTabs}
          options={{header: () => null,  gestureEnabled: false}}
        /> */}
        <Stack.Screen
          name="Map"
          component={Map}
          options = {{header: () => null}}
        />

        <Stack.Screen
          name="Bookmarks"
          component={Bookmarks}
          options={{header: () => null,  gesturesEnabled: false}}
        />

        <Stack.Screen
          name="CityDescription"
          component={CityDescription}
          options={{header: () => null,  gesturesEnabled: false}}
        />
      </Stack.Navigator>

    </NavigationContainer>
  );
}

export default AppWeatherNavigation;
