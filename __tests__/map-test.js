/**
 * @format
 */

import 'react-native';
import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Map from "../src/pages/map";
import Test from '../src/pages/test';

import { shallow, mount, configure } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import 'jsdom-global/register';


configure({ adapter: new Adapter() });
const mockStore = configureStore([]);

let wrapper;
let store;

describe('isOutsideDateRange', () => {
  beforeEach(() => {

    store = mockStore({
        myState: 'sample text',
    });

    const props = {
        name: "Aberto"
    }

    wrapper = shallow( 
        <Provider store={store}>
            <Map /> 
        </Provider>
    )
  });

  it('Map component renders correctly', () => {
    console.log("wrapper =>", wrapper.prop('children'))
    expect(wrapper.prop('children')).toBeTruthy();
  });

  it('Google maps loads correctly', () => {
    expect(wrapper.find(MapView)).toHaveLength(1); 
  });


  
});