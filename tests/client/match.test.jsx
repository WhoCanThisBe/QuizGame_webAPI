import React from "react";
import {Match} from "../../src/client/Match";
import {MemoryRouter} from "react-router-dom";
import renderer from 'react-test-renderer';


test.skip("display quiz",() =>{

    //TODO: make an better test

    const matchDisplay = (
        <MemoryRouter>
            <Match />
        </MemoryRouter>
    );

    const tree = renderer.create(matchDisplay).toJSON();

    expect(tree).toMatchSnapshot();

})




