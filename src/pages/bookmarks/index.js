import React, {useState} from "react";
import { View, Text, TouchableOpacity, Platform, StyleSheet, Image, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
//local imports
import BookmarksList from './designComponents/bookmarksList';
import BookmarHeader from './designComponents/bookmarksHeader';
import NoBookmarks from './designComponents/noBookmarks';

function Bookmarks(props) {

        console.log("propssss", props);

        const bookmarks = [
            {
                city: "Mexico", 
                temp: 20, 
                humidity: 60
            },
            {
                city: "Monterrey", 
                temp: 10, 
                humidity: 40
            },
            {
                city: "India", 
                temp: 29, 
                humidity: 20
            }
        ]

        return(
            <View style = {styles.container}>
                <BookmarHeader {...props}/>
                {
                    bookmarks.length > 0 ? 
                        <BookmarksList bookmarks = {bookmarks}/>
                    : 
                        <NoBookmarks />
                }
                
            </View>
        );
}

const styles = StyleSheet.create({
    container: {

      backgroundColor: "white", 
      height: "100%"
    },
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
    userName: {
        fontSize: 20,
        fontWeight: "500", 
        marginTop: 3
    },
    closeText: {
        margin: 25, marginLeft: 10, 
        marginBottom: 0, fontSize: 18, 
        fontWeight: "700"
    },
    imageStyle: {
        height: 50, 
        width: 50,
        marginRight: 15,
        marginLeft: 10
    }, 
    button: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.84,
        elevation: 3,
        position: "absolute", bottom: 5, left: 5, right: 5, padding: 15, backgroundColor: "#03b388", borderRadius: 5
    }

});

export default Bookmarks;
