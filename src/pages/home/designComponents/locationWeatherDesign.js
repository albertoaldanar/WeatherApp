import React from "react";
import { View, Text, TouchableOpacity, Platform, StyleSheet, Image, FlatList } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

function LocationWeatherDesign(props) {

        const renderHourlyData = ({ item, index }) => (
            <View style = {styles.listItem}>
                <Text style = {{marginBottom: 3}}>{index}:00</Text>
                <Text style = {{textAlign: "center", color: "gray"}}>{item.temp}º</Text>
            </View>
        );

        const renderDailyData = ({ item }) => (
            <View style = {styles.listItem}>
                <View>
                    <Text style = {{color: "#f83e3d"}}>{item.temp.max}</Text>
                    <Text style = {{color: "green"}}>{item.temp.min}</Text>
                </View>
                
            </View>
        );

        const { locationData, changeUnits } = props;

        return(
            <View style = {styles.container}>
                
                <View style = {{flexDirection:"row", marginTop: 20}}>
                    <TouchableOpacity style= {{marginLeft: 12, marginRight: 15}} onPress = { value => changeUnits("metric")}>
                        <Text style = {locationData.units == "metric" ? styles.unitSelected : styles.unitNotSelected}>Cº</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress = {value => changeUnits("imperial")}>
                        <Text style = {locationData.units == "imperial" ? styles.unitSelected : styles.unitNotSelected}>Fº</Text>
                    </TouchableOpacity>
                </View>

                <View style = {{margin: 10}}>
                    <Text style = {styles.city}><Icon name ="map-marker" size = {23}/>  {locationData.city}</Text>
                </View>

                <View style = {styles.currentMainData}>
                    <View>
                        <Text style = {{marginBottom: 3}}>Temperature</Text>
                        <Text style = {styles.weatherValue}>{locationData.currentMainData.temp}º</Text>
                    </View>

                    <View>
                        <Text style = {{marginBottom: 3}}>Humidity</Text>
                        <Text style = {styles.weatherValue}>{locationData.currentMainData.humidity} %</Text>
                    </View>

                    <View>
                        <Text style = {{marginBottom: 3}}>Sensation</Text>
                        <Text style = {styles.weatherValue}>{locationData.currentMainData.feels_like}º</Text>
                    </View>

                    <View>
                        <Text style = {{marginBottom: 3}}>Pressure</Text>
                        <Text style = {styles.weatherValue}>{locationData.currentMainData.pressure}</Text>
                    </View>
                    
                </View>

                <View style = {{marginTop: 15}}>
                    <Text style = {styles.title}> Clima de hoy</Text>
                    <View style = {styles.lists}>
                        <FlatList 
                            data = {locationData.hourlyData}
                            horizontal
                            renderItem = {renderHourlyData}
                            keyExtractor = {item => item.dt}
                            contentContainerStyle = {styles.scrollList}
                        />
                    </View>

                    <Text style = {styles.title}> Pronostico semanal (Max & Min)</Text>
                    <View style = {styles.lists}>
                        <FlatList 
                            data = {locationData.dailyData}
                            horizontal
                            renderItem = {renderDailyData}
                            keyExtractor = {item => item.dt}
                            contentContainerStyle = {styles.scrollList}
                        />
                    </View>
                </View>

            </View>
        );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#ffffff", 
    }, 
    listItem: {
        margin: 10,
        marginRight: 16,
    }, 
    lists: {
        marginTop: 20
    }, 
    city: {
        fontSize: 20, 
        color: "gray", 
        fontWeight: "300", 
        marginTop: 35
    }, 
    title: {
        marginTop: 55,
        fontSize: 16, 
        color: "gray", 
        fontWeight: "300", 
    }, 
    unitSelected: {
        textDecorationLine: "underline", 
        color: "#f83e3d"
    }, 
    unitNotSelected: {
        color: "gray"
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
    scrollList: {
        alignSelf: "center", 
        backgroundColor: "#f5f5f5", 
        borderRadius: 10, 
        marginRight: 15, 
        marginLeft: 15
    }
});

export default LocationWeatherDesign;
