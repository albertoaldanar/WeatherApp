
import 'react-native';
import React from 'react';
import {View, Text} from "react-native";
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Bookmark from "../src/pages/bookmarks";
import { shallow, mount, configure } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import 'jsdom-global/register';

configure({ adapter: new Adapter() });
const mockStore = configureStore([]);

let wrapper;
let store;

describe('Bookmarks testing', () => {

    beforeEach(() => {

        store = mockStore({
            myState: 'sample text',
        });

        const props = {
            bookmarksData: {
                data: [""]
            }
        }

        let getBookmarks = jest.fn()
    
        wrapper = shallow( 
            <Provider store={store}>
                <Bookmark {...props}/> 
            </Provider>
        )
    });
    
    it('Should render view', () => {

        console.log(wrapper);
    });

});
