/**
 * @format
 */

import 'react-native';
import React from 'react';
import { View, ScrollView, Text } from "react-native";
import Map from "../src/pages/map";
import Bookmark from '../src/pages/bookmarks/index';

import { shallow, mount, configure } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer'

configure({ adapter: new Adapter() });

let wrapper;

describe("Tests for Map", () => {
    beforeAll(() => {

        // const props ={
        //     name: "Alberto "
        // }
        wrapper = shallow(<Map />)
        
    });

    it("login component mounts correctly", () => {
        console.log("wrapper => ", wrapper);
    })

    // it("name state is 5", () => {
    //     expect(wrapper.instance().state.name).toBeEqualTo(5);
    // })
})

// describe("Test", () => {

//     beforeAll(() => {

//         const props = {
//             name: "Alberto", 
//             secondExampleFunction: sinon.spy(),
//         }

//         wrapper = shallow(<Login {...props}/>);
//     });

//     it('renders login', () => {
//         expect(wrapper.find(Text)).toHaveLength(2); 
//         // const tree = renderer.create(<Login />).toJSON();
//         // expect(tree).toMatchSnapshot();   
//     });

//     it('log', () => {

//         console.log("wrapper =>", wrapper.instance());
//         expect(wrapper.instance().props.name).toBeDefined();

//     });

//     it("Test example value ", () => {

//         const value = 10;

//         console.log("Instance  =>", wrapper.instance().state.exampleValue);

//         expect( wrapper.instance().state.exampleValue).toEqual(10);

//         // wrapper.instance().exampleFunction(6);

//         // expect(wrapper.props().secondExampleFunction.getCall(0)).toBeDefined();

//         // expect(wrapper.instance().state.exampleValue).toEqual(5);
//         // expect(wrapper.instance().props.secondExampleFunction).toHaveBeenCalledTimes(1);
//     })
// });

