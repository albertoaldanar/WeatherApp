import React, {Component} from "react";
import { Provider } from 'react-redux';
import WeatherAppNavigation from "./navigation/nav";
import store from './redux/store';

class App extends Component {

    render(){
        return(
            <Provider store={store}>
                <WeatherAppNavigation />
            </Provider>
        );
    }
}

export default App;
