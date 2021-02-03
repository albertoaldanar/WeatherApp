import React, { useEffect} from "react";
import { Provider } from 'react-redux';
import WeatherAppNavigation from "./navigation/nav";
import store from './redux/store';
import * as firebase from 'firebase';
import firebaseConfig from './firebase/firebaseConfig';

const App  = () =>  {

    useEffect(() => {
        if(!firebase.apps.length){
            firebase.initializeApp(firebaseConfig);

            firebase.firestore().settings({ experimentalForceLongPolling: true });
        }
    })

    return(
        <Provider store={store}>
            <WeatherAppNavigation />
        </Provider>
    );

}

export default App;
