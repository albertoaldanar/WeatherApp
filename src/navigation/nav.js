import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LocationSearch from '../pages/locationSearch';
import Map from '../pages/map';
import Bookmarks from '../pages/bookmarks';
import Home from '../pages/home';
import CityDescription from '../pages/cityDescription';

const Stack = createStackNavigator();

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
