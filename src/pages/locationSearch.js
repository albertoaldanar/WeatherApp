import React, {useState, useEffect} from "react";
import { Alert, Image , PermissionsAndroid, Platform, StyleSheet, Text, TouchableOpacity, View  } from "react-native";
import { connect } from "react-redux";
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
//local imports
import LocationGif from '../assets/location.gif';
import changeLocationState from '../redux/actions/locationDataActions';
import API from '../apis/weather/weatherApi';

function LocationSearch(props) {

        useEffect(() => {
            setTimeout(() => {
                getPermissions();
            },  2000)
        }, []);

        async function getPermissions(){

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
                getCurrentPosition();
            }
        }

        async function getCurrentPosition(){
            const { changeLocationState } = props;

            Geolocation.getCurrentPosition(
                (position) => {

                    console.log("POSITION = >", position);

                    changeLocationState({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    })

                    getLocationName(position.coords.latitude, position.coords.longitude);
                }, (error) => {
                    console.log(error)
                }
            );
        }

        async function getLocationWeather(){
            try {
                const { locationData, changeLocationState } = props;
    
                const weatherResponse = await API.getLocationData(locationData);
    
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

        async function getLocationName(lat, lon){

            const { changeLocationState, locationData } = props;

            Geocoder.init('AIzaSyCpU3x_xDHxgw-lzjj1AyOpL8Ww3CamaHs'); // use a valid API key
            Geocoder.from(lat, lon).then(json => {

                var addressComponent = json.results[0].address_components;
                var city = "";
                var country = "";

                for (var obj of addressComponent) {

                    if (obj.types[0] == "country" || obj.types[0] == "political") {
                        country = obj.long_name
                    } else if (obj.types[0] == "locality") {
                        city = obj.long_name
                    }
                }

                changeLocationState({
                    city: city + ", " + country
                });

                getLocationWeather(locationData);

            });
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
        locationData: state.locationData,
    }
}

const mapDispatchToProps = dispatch => ({
    changeLocationState: (object) => dispatch(changeLocationState(object)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationSearch);
