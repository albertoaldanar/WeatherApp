import React, {useState, useRef, useEffect} from "react";
import { Alert, View, Text, TouchableOpacity, Platform, StyleSheet, Image, ScrollView } from "react-native";
import { connect } from "react-redux";
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
//local imports
import API from '../../apis/weather/weatherApi';
import HomeHeader from '../home/designComponents/homeHeader';
import LocationWeatherDesign from '../home/designComponents/locationWeatherDesign';
import changeLocationState from '../../redux/actions/locationDataActions';
import LoaderModal from '../../utils/modalLoader';
 
function Home(props) {

    const { locationData, changeLocationState } = props;
    const [ loadingModal, setLoadingModal ] = useState(false);
    const [ isBookmarked, setIsBookmarked] = useState(false);
    const inputGoogle = useRef(null); 
    const db = firebase.firestore();
    const deviceLocation = {
        description: "Your location", 
        geometry: { 
            location: {
                lat: locationData.deviceLat,
                lng: locationData.deviceLon
            } 
        }, 
        formatted_address: locationData.deviceCity
    } 
    const [searchList, setSearchList ] = useState([]);


    useEffect(() => {
        getSearchList();
    }, [])

    async function getSearchList(){
        const snapshot = await firebase.firestore().collection('searchList').get();
        var result = snapshot.docs.map(doc => doc.data());
        setIsBookmarked(false);

        setTimeout(() => {
            setSearchList(result)
        });
    }

    async function saveSearch(city, lat, lon){

        if(city != locationData.deviceCity){
            await db.collection('searchList').doc(city).set({
                description: city, 
                geometry: { 
                    location: {
                        lat: lat,
                        lng: lon
                    } 
                }, 
                formatted_address: city
            });  
        }

        getSearchList();
    }

    async function getWeatherData(unit, lat, lon, city) {

        const data = {
            units: unit, 
            lat: lat, 
            lon: lon
        }
        
        if(city != undefined){  // Only executed when changed city
            changeLocationState({
                city: city, lat: lat, lon: lon
            })

            saveSearch(city, lat, lon);
            setIsBookmarked(false);
        }

        inputGoogle.current.setAddressText("");

        setLoadingModal(true);

        try {

            const weatherResponse = await API.getLocationData(data);

            console.log('weather response =>', weatherResponse);

            if (weatherResponse.current) {
                setLoadingModal(false);

                changeLocationState({
                    hourlyData: weatherResponse.hourly.slice(0, 25), 
                    dailyData: weatherResponse.daily, 
                    currentMainData: weatherResponse.current, 
                });

                validateBookmark(city);
               
            } else {
                setLoadingModal(false);

                alert("error")
                console.log("error!")
            }
          
        } catch (err) {
            setLoadingModal(false);
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

    const changeUnits = (unit) => {

        changeLocationState({
            units: unit
        });

        getWeatherData(unit, locationData.lat, locationData.lon);
    }

    async function addBookmark(){ 

        await db.collection('bookmarks').doc(locationData.city).set({
            city: locationData.city, 
            lat: locationData.lat,
            lon: locationData.lon
        });

        Alert.alert(
            "Saved!",
            "Bookmark saved correctly",
            [

              { text: "OK", onPress: () => props.navigation.navigate('Bookmarks')}
            ],
            { cancelable: false }
        );
    }   

    async function validateBookmark(city) {

        const snapshot = await firebase.firestore().collection('bookmarks').get();
        var cities = snapshot.docs.map(doc => doc.data());

        cities.map(c => {
            console.log("compare =>", c.city, city)
            if(c.city == city){
                setIsBookmarked(true)
            } 
        });
    }

    console.log("location => ", locationData, searchList, isBookmarked);

    return(
        <View style = {styles.container}>
            <LoaderModal visibleModal={loadingModal} text={'Loading...'} />

            <HomeHeader {...props}/>

            <ScrollView keyboardShouldPersistTaps={"always"}>
                {
                    searchList.length > 0 ? 
                        <GooglePlacesAutocomplete
                            ref={inputGoogle}
                            placeholder='Search city..'
                            minLength={2}
                            autoFocus={false}
                            listViewDisplayed='auto'
                            returnKeyType={'default'}
                            fetchDetails={true}
                            nearbyPlacesAPI='GooglePlacesSearch'
                            GooglePlacesSearchQuery={{
                                rankby: 'distance',
                                type: 'establishment'
                            }}
                            styles={{
                                container: {
                                    margin: 0,
                                },
                                listView : {
                                    backgroundColor: "#f5f5f5"
                                },
                                textInputContainer: {
                                width: '100%',
                                marginTop: 15, 
                                },
                                textInput: {
                                    color: '#5d5d5d',
                                    height: 20,
                                    backgroundColor: "#f5f5f5",
                                    fontSize: 16, 
                                    height: 38,
                                },
                                predefinedPlacesDescription: {
                                    color: '#1faadb'
                                }
                            }}
                            query={{
                                key: 'AIzaSyCpU3x_xDHxgw-lzjj1AyOpL8Ww3CamaHs',
                                language: 'es', // language of the results
                            }}
                            listViewDisplayed='auto'
                            fetchDetails={true}
                            renderDescription={row => row.description} 
                            onPress={(data, details = null) => {
                                console.log("details =>", details);
                                getWeatherData("metric", details.geometry.location.lat, details.geometry.location.lng, details.formatted_address);
                            }}
                            predefinedPlaces = {[deviceLocation].concat(searchList) }
                        /> 
                    : 
                        null
                }

                <LocationWeatherDesign locationData = {locationData} changeUnits = {changeUnits}/>

                {
                    !isBookmarked ? 
                        <TouchableOpacity style = {styles.saveButton} onPress = {() => addBookmark()}>
                            <Text style = {styles.saveText}> <Icon name = "bookmark" size = {20}/> Save location</Text>
                        </TouchableOpacity>
                    : 
                        <View style = {styles.saveButton}>
                            <Text style = {styles.saveText}> <Icon name = "check" size = {20}/> Bookmarked</Text>
                        </View>
                }

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'ios' ? 19 : 10,
      backgroundColor: "#ffffff", 
      flex: 1
    },
    imageStyle: {
        height: 150, 
        width: 150,
        marginBottom: 30
    }, 
    saveButton: {
        marginTop: 30,
        alignSelf: "center"
    }, 
    saveText: {
        fontWeight: "300",
        color: "black"
    }
});

const mapStateToProps = (state) => {
    return {
        locationData: state.locationData,
    }
}

const mapDispatchToProps = dispatch => ({
    changeLocationState: (object) => dispatch(changeLocationState(object)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Home);
