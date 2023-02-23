import renderer from 'react-test-renderer';
import * as React from "react";
import TimerCard from './TimerCard'

it('Renders the right ammount of completeds', () => {
    const component = renderer.create(
        <TimerCard></TimerCard>
    );

    const mockDispatch = jest.fn(); 

    jest.mock('react-redux', () => ({
        ...jest.requireActual('react-redux'), 
        useDispatch: () => mockDispatch
    }))

    let tree = component.toJSON(); 
    expect(tree).toMatchSnapshot();

    renderer.act(() => {

    });
})