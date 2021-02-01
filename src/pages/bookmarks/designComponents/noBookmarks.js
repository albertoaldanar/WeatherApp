import React from "react";
import { View, Text, TouchableOpacity, Platform, StyleSheet, Image } from "react-native";
//local imports
import BookMark from '../../../assets/bookmark.png'

function NoBookmarks(props) {
        console.log(props);

        return(
            <View style = {styles.container}>
                <Image source = {BookMark} style = {styles.imageStyle}/>
                <Text style = {styles.text}>You have no bookmarks</Text>
            </View>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white", 
        alignItems: "center"
    }, 
    imageStyle: {
        marginTop: "30%", 
        width: 250, height: 250
    }, 
    text: {
        marginTop: 25, color: "gray", fontSize: 18 
    }
});

export default NoBookmarks;
