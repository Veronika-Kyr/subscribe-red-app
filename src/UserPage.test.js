import React from 'react';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'
import { UserPage } from './UserPage';


const mockstore = configureStore([]);
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
        pathname: "localhost:3000/community/:id"
    })
}));

describe('render component', () => {
    describe('section for a particular user is appeared', () => {
        let store;
        beforeEach(() => {
            store = mockstore({
                user: {
                    onIDdata: [{
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
                        <UserPage />
                    </Router>
                </Provider>
            )
        });
        test('it should render UserPage', () => {
            const headElement = screen.getByRole('heading', { level: 5 });
            expect(headElement).toBeInTheDocument();
        });

        test('it should fetch UserPage', () => {
            expect(store.dispatch).toHaveBeenCalledTimes(1);
        })
    })
})