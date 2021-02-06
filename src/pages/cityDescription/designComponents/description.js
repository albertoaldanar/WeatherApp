import React, {useState, useEffect} from "react";
import { Alert, View, Text, TouchableOpacity, Platform, StyleSheet, Image } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

function Description(props) {

    const { selectedCityData } = props;
    
    return(
        <View style = {styles.container}>

            <View style = {styles.dataContainer}>

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

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    dataContainer: {
        marginTop: "10%"
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
    }, 
    deleteButton: {
        position: "absolute", 
        bottom: 35, 
        alignSelf: "center"
    }, 
    saveButton: {
        position: "absolute", 
        bottom: 35, 
        alignSelf: "center"
    }, 
    deleteText: {
        fontWeight: "300",
        color: "#CB0A13"
    }, 
    saveText: {
        fontWeight: "300",
        color: "black"
    }
});

export default Description
