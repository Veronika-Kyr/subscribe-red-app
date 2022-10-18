import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import JoinProgram from './JoinProgram';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'

const mockstore = configureStore([]);

describe('render component when user is unsubscribed', () => {
    let store;

    beforeEach(() => {
        store = mockstore({
            subscribing: {
                data: [],
                isSubscribed: false,
            }
        });
        store.dispatch = jest.fn();

        render(
            <Provider store={store}>
                <Router>
                    <JoinProgram />
                </Router>
            </Provider>
        )
    });

    test('render component Join Our Program', () => {
        const head = screen.getByText('Join Our Program');
        expect(head).toBeInTheDocument();
    });

    test('render button "Subscribe" for the first page load and it is enabled', () => {
        const btnSubscr = screen.getByText('SUBSCRIBE');
        expect(btnSubscr).toBeInTheDocument();
        expect(btnSubscr.disabled).toEqual(false);
        const input = screen.getByPlaceholderText('E-mail');
        expect(input.value).toBe('');
    });

    test('do not render button "Unsubscribe" for the first page load', () => {
        const btnUnSubscr = screen.queryByText('UNSUBSCRIBE');
        expect(btnUnSubscr).toBeNull();
    });

    test('types into the input', () => {
        const input = screen.getByPlaceholderText('E-mail');
        userEvent.type(input, 'hello@gmail.com');
        expect(input.value).toBe('hello@gmail.com');
    })

    test('on click button "Subscribe" should call dispatch and button becomes disabled', () => {
        const btnSubscr = screen.getByText('SUBSCRIBE');
        userEvent.click(btnSubscr);
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(btnSubscr.disabled).toEqual(true);
    });
});


describe('component when user is subscribed', () => {
    let store;

    beforeEach(() => {
        store = mockstore({
            subscribing: {
                data: [],
                isSubscribed: true,
            }
        });
        store.dispatch = jest.fn();

        render(
            <Provider store={store}>
                <Router>
                    <JoinProgram />
                </Router>
            </Provider>
        )
    });
    test('render Join Our Program', () => {
        const head = screen.getByText('Join Our Program');
        expect(head).toBeInTheDocument();
    });

    test('render button "Unsubscribe" when user has subscribed and it is enabled', () => {
        const btnUnSubscr = screen.getByText('UNSUBSCRIBE');
        expect(btnUnSubscr).toBeInTheDocument();
        expect(btnUnSubscr.disabled).toEqual(false);
    });

    test('do not render button "Subscribe" when user has subscribed', () => {
        const btnSubscr = screen.queryByText('SUBSCRIBE');
        expect(btnSubscr).toBeNull();
    });

    test('on click button "Subscribe" should call dispatch and button becomes disabled', () => {
        const btnUnSubscr = screen.getByText('UNSUBSCRIBE');
        userEvent.click(btnUnSubscr);
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(btnUnSubscr.disabled).toEqual(true);
    });
});

describe('component when error', () => {
    let store;

    beforeEach(() => {
        store = mockstore({
            subscribing: {
                data: [{ error: 'Email is already in use' }],
                isSubscribed: false,
            }
        });
        store.dispatch = jest.fn();

        render(
            <Provider store={store}>
                <Router>
                    <JoinProgram />
                </Router>
            </Provider>
        )
    });

    test('render button "Subscribe" when there is error payload', () => {
        const btnSubscr = screen.getByText('SUBSCRIBE');
        expect(btnSubscr).toBeInTheDocument();
        expect(btnSubscr.disabled).toEqual(false);
        const input = screen.getByPlaceholderText('E-mail');
        expect(input.value).toBe('');
    });
});



