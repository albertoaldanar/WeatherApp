import React, {useState, useEffect} from "react";
import { Alert, View, Text, TouchableOpacity, Platform, StyleSheet, Image } from "react-native";
import { connect } from "react-redux";
// import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
//local imports
import LocationGif from '../assets/location.gif';
import changeLocationState from '../redux/actions/locationDataActions';
import API from '../apis/weather/weatherApi';

function LocationSearch(props) {

        useEffect(() => {
            setTimeout(() => {
                getCurrentPosition();
            },  2000)
        }, []);

        async function getCurrentPosition(){

            const { changeLocationState, locationData } = props;

            Geolocation.getCurrentPosition(
                (position) => {

                    console.log("POSITION = >", position);

                    changeLocationState({
                        lat: position.coords.latitude,
                        lon: position.coords.latitude
                    })

                    getLocationWeather(locationData);
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
                        hourlyData: weatherResponse.hourly, 
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
        locationData: state.locationData,
    }
}

const mapDispatchToProps = dispatch => ({
    changeLocationState: (object) => dispatch(changeLocationState(object)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationSearch);
