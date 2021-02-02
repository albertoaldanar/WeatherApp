import React, {useState, useEffect} from "react";
import { View, Text, TouchableOpacity, Platform, StyleSheet, Image } from "react-native";
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';
//local imports
import setSelectedCity from '../../redux/actions/selectedCityActions';
import API from '../../apis/weather/weatherApi';

function CityDescription(props) {

    useEffect(() => {
        getWeatherData();
    }, []);
    
    async function getWeatherData() {
        console.log(props);
        const cityData = props.route.params.data;

        try {

            const { setSelectedCity } = props;

            const data = {
                lat: cityData.lat, 
                lon: cityData.lon, 
                units: "metric"
            }

            const weatherResponse = await API.getLocationData(data);

            console.log('weather response =>', weatherResponse);

            if (weatherResponse.current) {

                setSelectedCity({
                    currentMainData: weatherResponse.current, 
                    city: cityData.city
                });
               
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

    const { selectedCityData } = props;
    
    return(
        <View style = {styles.container}>
            <View style = {styles.header}>
                <TouchableOpacity style = {{margin: 25, marginLeft: 15, marginBottom: 0, fontSize: 18, fontWeight: "700"}} onPress = {()  => props.navigation.goBack()}>
                    <Icon name= "arrow-left" size= {18} color =  "gray"/> 
                </TouchableOpacity>
            </View> 
                <View style = {{margin: 10}}>
                    <Text style = {styles.city}><Icon name ="map-marker" size = {23}/>  {selectedCityData.city}</Text>
                </View>

                <View style = {styles.currentMainData}>
                    <View>
                        <Text style = {{marginBottom: 3}}>Temperature</Text>
                        <Text style = {styles.weatherValue}>{selectedCityData.currentMainData.temp}º</Text>
                    </View>

                    <View>
                        <Text style = {{marginBottom: 3}}>Humidity</Text>
                        <Text style = {styles.weatherValue}>{selectedCityData.currentMainData.humidity} %</Text>
                    </View>

                    <View>
                        <Text style = {{marginBottom: 3}}>Sensation</Text>
                        <Text style = {styles.weatherValue}>{selectedCityData.currentMainData.feels_like}º</Text>
                    </View>

                    <View>
                        <Text style = {{marginBottom: 3}}>Pressure</Text>
                        <Text style = {styles.weatherValue}>{selectedCityData.currentMainData.pressure}</Text>
                    </View>
                    
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        marginTop: "20%"
    },
    imageStyle: {
        height: 150, 
        width: 150,
        marginBottom: 30
    }, 
    unitSelected: {
        textDecorationLine: "underline", 
        color: "#f83e3d"
    }, 
    currentMainData: {
        flexDirection: "row",
        justifyContent: "space-between", 
        margin: 20, 
        marginBottom: 0
    }, 
    weatherValue: {
        textAlign: "center", color: "gray", fontSize: 16, fontWeight: "300"
    }
});

const mapStateToProps = (state) => {
    return {
        selectedCityData: state.selectedCityData,
    }
}

const mapDispatchToProps = dispatch => ({
    setSelectedCity: (object) => dispatch(setSelectedCity(object)),
});


export default connect(mapStateToProps, mapDispatchToProps)(CityDescription);

