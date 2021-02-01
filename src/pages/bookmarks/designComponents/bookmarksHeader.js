import React from "react";
import { View, Text, TouchableOpacity, Platform, StyleSheet, Image } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

Icon.loadFont();

function HomeHeader(props) {
        console.log(props);

        return(
            <View style = {styles.header}>
                <TouchableOpacity style = {{margin: 25, marginLeft: 15, marginBottom: 0, fontSize: 18, fontWeight: "700"}} onPress = {()  => props.navigation.goBack()}>
                    <Icon name= "arrow-left" size= {18} color =  "gray"/> 
                </TouchableOpacity>
            </View>
        );
}

const styles = StyleSheet.create({
    header: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.84,
        elevation: 3,
        backgroundColor: "white",
        flexDirection: "row", justifyContent: "space-between", 
        paddingTop: Platform.OS == "android" ? 0 : 15,
        paddingBottom: 15

    },
});

export default HomeHeader;
