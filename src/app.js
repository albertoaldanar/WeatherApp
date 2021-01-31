import React, {Component} from "react";
import { Provider } from 'react-redux';
import WeatherNavigation from "./navigation/nav";
import store from './redux/store';

class App extends Component {

    render(){
        return(
            <Provider store={store}>
                <WeatherNavigation />
            </Provider>
        );
    }
}

export default App;
