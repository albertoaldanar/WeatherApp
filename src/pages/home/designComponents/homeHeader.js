import React from "react";
import { View, Text, TouchableOpacity, Platform, StyleSheet, Image } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();

function HomeHeader(props) {
        console.log(props);

        return(
                <View style = {styles.header}>
                    <TouchableOpacity style = {{marginLeft: 17}} onPress = { () => props.navigation.navigate("Bookmarks")}>
                        <Icon name= "bookmark" size= {21} color = "#F83E3D"/>
                    </TouchableOpacity>

                    <TouchableOpacity style = {{marginRight: 17}} onPress = {() => props.navigation.navigate("Map")}>
                        <Icon name= "map" size= {21} color = "#F83E3D"/>
                    </TouchableOpacity>
                </View>
        );
}

const styles = StyleSheet.create({
    container: {
      paddingTop: Platform.OS === 'ios' ? 19 : 10,
      backgroundColor: "#ffffff", 
    },
    header: {
        flexDirection:"row", 
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 15,
        justifyContent: "space-between", 
        shadowColor: "#000",
        backgroundColor: "white",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.0,
        elevation: 5
    },
});

export default HomeHeader;
