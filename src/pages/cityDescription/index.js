import React, {useState, useEffect} from "react";
import { View, Text, TouchableOpacity, Platform, StyleSheet, Image } from "react-native";
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'firebase';
//local imports
import setSelectedCity from '../../redux/actions/selectedCityActions';
import setBookmarksList from '../../redux/actions/bookmarksActions';
import API from '../../apis/weather/weatherApi';

function CityDescription(props) {

    const db = firebase.firestore();
    const [isBookmarked, setIsBookmarked] = useState(true);

    useEffect(() => {
        getWeatherData();
    }, []);

    async function validateBookmark() {

        const cityData = props.route.params.data;

        const snapshot = await firebase.firestore().collection('bookmarks').get();
        var cities = snapshot.docs.map(doc => doc.data());

        cities.map(city => {
            console.log(city)
            if(city == cityData.city){
                setIsBookmarked(true)
            }  else {
                setIsBookmarked(false)
            }
        });

        console.log(cityData, cities);

    }
    
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

                // validateBookmark();
               
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

    async function addToBookmark(){

        await db.collection('bookmarks').doc(selectedCityData.city).set({
            city: selectedCityData.city, 
            lat: selectedCityData.lat,
            lon: selectedCityData.lon
        });
    }

    async function deleteBookmark(){
        const { setBookmarksList } = props;
        
        await db.collection('bookmarks').doc(selectedCityData.city).delete();

        const snapshot = await firebase.firestore().collection('bookmarks').get();
        var result = snapshot.docs.map(doc => doc.data());

        setBookmarksList({data: result});   

        await props.navigation.navigate("Bookmarks");

    }

    const { selectedCityData } = props;
    console.log("is booked =>", isBookmarked);
    
    return(
        <View style = {styles.container}>
            <TouchableOpacity style = {{margin: 25, marginLeft: 15, marginBottom: 0, fontSize: 18, fontWeight: "700"}} onPress = {()  => props.navigation.goBack()}>
                <Icon name= "arrow-left" size= {18} color =  "gray"/> 
            </TouchableOpacity>

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

            {
                isBookmarked ? 
                    <TouchableOpacity style = {styles.deleteButton} onPress = {() => deleteBookmark()}>
                        <Text style = {styles.deleteText}> <Icon name = "trash" size = {20}/> Delete city</Text>
                    </TouchableOpacity >

                : 
                    <TouchableOpacity style = {styles.saveButton} onPress = {() => addToBookmark()}>
                        <Text style = {styles.saveText}> <Icon name = "bookmark" size = {20}/> Save location</Text>
                    </TouchableOpacity >
            }


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

const mapStateToProps = (state) => {
    return {
        selectedCityData: state.selectedCityData,
    }
}

const mapDispatchToProps = dispatch => ({
    setSelectedCity: (object) => dispatch(setSelectedCity(object)),
    setBookmarksList: (object) => dispatch(setBookmarksList(object)),
});


export default connect(mapStateToProps, mapDispatchToProps)(CityDescription);

