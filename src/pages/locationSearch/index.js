import React, {useState, useEffect} from "react";
import { Alert, Image , PermissionsAndroid, Platform, StyleSheet, Text, TouchableOpacity, View  } from "react-native";
import { connect } from "react-redux";
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
//local imports
import LocationGif from '../../assets/location.gif';
import changeLocationState from '../../redux/actions/locationDataActions';

import API from '../../apis/weather/weatherApi';

function LocationSearch(props) {

        const { changeLocationState, locationData } = props;

        useEffect(() => {
            setTimeout(() => {
                getPermissions();
            },  2000)
        }, []);

        async function getPermissions(){

            console.log("PASO 1");

            if(Platform.OS == "android"){
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        'title': 'Location permissions',
                        'message': 'WeatherApp wants to access your location.',
                        buttonPositive: "OK"
                    }
                )
    
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    getCurrentPosition();
                } else {
                    alert("No permissions")
                }
                
            } else {
                // getCurrentPosition();
                changeLocationState({
                    lat: 53.478062,
                    lon: -2.244666, 
                    deviceLat: 53.478062, 
                    deviceLon: -2.244666,
                })

                getLocationName(53.478062, -2.244666);
            }
        }

        async function getCurrentPosition(){
 
            console.log("PASO 2");

            Geolocation.getCurrentPosition(
                (position) => {

                    console.log("POSITION = >", position);

                    changeLocationState({
                        deviceLat: position.coords.latitude, 
                        deviceLon: position.coords.longitude,
                        lat: position.coords.latitude,
                        lon: position.coords.longitude, 
                    })

                    getLocationName(position.coords.latitude, position.coords.longitude);
                }, (error) => {
                    console.log(error)
                }
            );
        }

        function getLocationName(lat, lon){
            
            console.log("PASO 3", lat, lon);
            var city = "";
            var country = "";

            Geocoder.init('AIzaSyCpU3x_xDHxgw-lzjj1AyOpL8Ww3CamaHs'); // use a valid API key
            Geocoder.from(lat, lon).then(json => {

                var addressComponent = json.results[0].address_components;

                console.log("adress com =>", addressComponent)

                for (var obj of addressComponent) {

                    if (obj.types[0] == "country" || obj.types[0] == "political") {
                        country = obj.long_name
                    } else if (obj.types[0] == "locality" || obj.types[0] == "postal_town") {
                        city = obj.long_name
                    }
                }
                changeLocationState({
                    city: city + ", " + country, 
                    deviceCity: city + ", " + country
                });
            });
            
            getLocationWeather(lat, lon);

        }

        async function getLocationWeather(lat, lon){

            try {
                const data = {
                    units: "metric", 
                    lat:lat, 
                    lon: lon
                }

                console.log("PASO 4", locationData);

                const weatherResponse = await API.getLocationData(data);
    
                console.log('weather response =>', weatherResponse);
    
                if (weatherResponse.current) {
                    changeLocationState({
                        hourlyData: weatherResponse.hourly.slice(0, 25), 
                        dailyData: weatherResponse.daily, 
                        currentMainData: weatherResponse.current 
                    });

                   props.navigation.navigate("Home");
                   
                } else {
                    alert("error")
                    console.log("error!")
                    
                }
              
            } catch (err) {
                alert(err);
    
                if (err instanceof TypeError) {
                    if (err.message == 'Network request failed') {
                        alert("No hay internet");
                           console.log("No hay internet")
                    }
                    else {
                        alert("El servicio esta fallando.")
                        console.log('Ups..', 'Por el momento este servicio no esta disponible, vuelva a intentarlo mas tarde');
                    }
                }
            }
        }

    
        console.log("props => ", props.locationData);
        
        return(
            <View style = {styles.container}>
                <Image source = {LocationGif} style = {styles.imageStyle}/>
                <Text style = {{fontStyle: "italic", textAlign: "center", fontSize: 17, color: "gray"}}>Searching your location...</Text>
            </View>
        );
}

const styles = StyleSheet.create({
    container: {
      paddingTop: Platform.OS === 'ios' ? 19 : 10,
      backgroundColor: "white", 
      flex: 1
    },
    imageStyle: {
        height: 400, 
        width: 400,
        marginTop: "20%"
    }, 
});

const mapStateToProps = (state) => {
    return {
        locationData: state.locationData
    }
}

const mapDispatchToProps = dispatch => ({
    changeLocationState: (object) => dispatch(changeLocationState(object)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationSearch);
