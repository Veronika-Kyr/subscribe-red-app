import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import BigCommunity from './BigCommunity';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'


const mockstore = configureStore([]);
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
        pathname: "localhost:3000/community/:id"
    })
}));

describe('component renders', () => {
    describe('section is appeared', () => {
        let store;

        test('it should render Community with section', () => {
            store = mockstore({
                section: { showSect: true },
                users: {
                    data: [{
                        id: "2f1b6bf3-f23c-47e4-88f2-e4ce89409376",
                        avatar: "http://localhost:3000/avatars/avatar1.png",
                        firstName: "Mary",
                        lastName: "Smith",
                        position: "Lead Designer at Company Name",
                        citate: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolor."
                    }]
                }
            });
            store.dispatch = jest.fn();

            render(
                <Provider store={store}>
                    <Router>
                        <BigCommunity />
                    </Router>
                </Provider>
            )

            const headElement = screen.getByText('Big Community', { exact: false });
            expect(headElement).toBeInTheDocument();
            const btnHide = screen.getByText('Hide section');
            fireEvent.click(btnHide);
            expect(store.dispatch).toHaveBeenCalled();
        })

        test('it should render Community without section', () => {
            store = mockstore({
                section: { showSect: false },
                users: {
                    data: [{
                        id: "2f1b6bf3-f23c-47e4-88f2-e4ce89409376",
                        avatar: "http://localhost:3000/avatars/avatar1.png",
                        firstName: "Mary",
                        lastName: "Smith",
                        position: "Lead Designer at Company Name",
                        citate: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolor."
                    }]
                }
            });
            store.dispatch = jest.fn();

            render(
                <Provider store={store}>
                    <Router>
                        <BigCommunity />
                    </Router>
                </Provider>
            )
            const subheadElement = screen.queryByText('proud of our products', { exact: false });
            expect(subheadElement).toBeNull();
        })
    })
})
