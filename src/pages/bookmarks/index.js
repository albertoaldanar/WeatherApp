import React, {useState, useEffect} from "react";
import { View, Text, TouchableOpacity, Platform, StyleSheet, Image, ScrollView } from "react-native";
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'firebase';
//local imports
import BookmarksList from './designComponents/bookmarksList';
import BookmarHeader from './designComponents/bookmarksHeader';
import NoBookmarks from './designComponents/noBookmarks';
import setBookmarksList from '../../redux/actions/bookmarksActions';
import firebaseConfig from '../../firebase/firebaseConfig';

function Bookmarks(props) {

        useEffect(() => {
            if(!firebase.apps.length){
                firebase.initializeApp(firebaseConfig);
            }
            
            getBookmarks();
        }, [])

        async function getBookmarks(){
            const { setBookmarksList } = props;
            firebase.firestore().settings({ experimentalForceLongPolling: true });
            
            const snapshot = await firebase.firestore().collection('bookmarks').get()
            var result = snapshot.docs.map(doc => doc.data())
            setBookmarksList({data: result});   
        }

        const { bookmarksData } = props;

        console.log("BOOKMARKS =>", bookmarksData);

        return(
            <View style = {styles.container}>
                <BookmarHeader {...props}/>
                {
                    bookmarksData.data.length > 0 ? 
                        <BookmarksList bookmarks = {bookmarksData} {...props} />
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


const mapStateToProps = (state) => {
    return {
        bookmarksData: state.bookmarksData,
    }
}

const mapDispatchToProps = dispatch => ({
    setBookmarksList: (object) => dispatch(setBookmarksList(object)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Bookmarks);
