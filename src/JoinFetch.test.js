import React from 'react';
import { fetchSubscribe } from './subscribeSlice';
import nock from "nock";
import store from './store';


const data = [{ success: true }]
const dataErr1 = [{ error: "Wrong payload" }];
const dataErr2 = [{ error: "Email is already in use" }];
const umail = {
    email: 'user@gmail.com'
};
const err2 = {
    email: 'forbidden@gmail.com'
};

describe('expectedData when subscribing', () => {
    it('Should fetch for subscribing with correct email', async () => {
        const mockNetworkResponse = () => {
            nock('http://localhost:3000', {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .defaultReplyHeaders({
                    'access-control-allow-origin': '*',
                    'access-control-allow-credentials': 'true'
                })
                .post('/subscribe', umail)
                .reply(200, {
                    data
                })
        }
        mockNetworkResponse();
        const result = await store.dispatch(fetchSubscribe({ api: 'http://localhost:3000/subscribe', email: umail }))
        const res = result.payload
        expect(result.type).toBe('subscribe/fetch/fulfilled')
        expect(res.success).toEqual(data.success)
    });

    it('Should get rejection with posting incorrect form of email information', async () => {
        const mockNetworkResponse = () => {
            nock('http://localhost:3000', {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .defaultReplyHeaders({
                    'access-control-allow-origin': '*',
                    'access-control-allow-credentials': 'true'
                })
                .post('/subscribe')
                .reply(400, {
                    dataErr1
                })
        }
        mockNetworkResponse();
        const result = await store.dispatch(fetchSubscribe({ api: 'http://localhost:3000/subscribe', email: '' }))
        const res = result.payload
        expect(result.type).toBe('subscribe/fetch/fulfilled');
        expect(res.error).toEqual(dataErr1.error);
    });

    it('Should get rejection with posting incorrect email information', async () => {
        const mockNetworkResponse = () => {
            nock('http://localhost:3000', {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .defaultReplyHeaders({
                    'access-control-allow-origin': '*',
                    'access-control-allow-credentials': 'true'
                })
                .post('/subscribe', err2)
                .reply(422, {
                    dataErr2
                })
        }
        mockNetworkResponse();
        const result = await store.dispatch(fetchSubscribe({ api: 'http://localhost:3000/subscribe', email: err2 }))
        const res = result.payload
        expect(result.type).toBe('subscribe/fetch/fulfilled');
        expect(res.error).toEqual(dataErr2.error);
    });

    it('Should fetch for subscribing with mistake', async () => {
        const mockNetworkResponse = () => {
            nock('http://localhost:3000', {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .defaultReplyHeaders({
                    'access-control-allow-origin': '*',
                    'access-control-allow-credentials': 'true'
                })
                .post('/subscribe', umail)
                .reply(400, {
                    data
                })
        }
        mockNetworkResponse();
        const result = await store.dispatch(fetchSubscribe())
        expect(result.type).toBe('subscribe/fetch/rejected')
    });
})

describe('expectedData when unsubscribing', () => {
    it('Should fetch for unsubscribing', async () => {
        const mockNetworkResponse = () => {
            nock('http://localhost:3000', {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .defaultReplyHeaders({
                    'access-control-allow-origin': '*',
                    'access-control-allow-credentials': 'true'
                })
                .post('/unsubscribe')
                .reply(200, {
                    data
                })
        }
        mockNetworkResponse();
        const result = await store.dispatch(fetchSubscribe({ api: 'http://localhost:3000/unsubscribe' }))
        const res = result.payload
        expect(result.type).toBe('subscribe/fetch/fulfilled')
        expect(res.success).toEqual(data.success)
    });

    it('Should fetch for unsubscribing with mistake', async () => {
        const mockNetworkResponse = () => {
            nock('http://localhost:3000', {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .defaultReplyHeaders({
                    'access-control-allow-origin': '*',
                    'access-control-allow-credentials': 'true'
                })
                .post('/unsubscribe')
                .reply(400, {
                    data
                })
        }
        mockNetworkResponse();
        const result = await store.dispatch(fetchSubscribe())
        expect(result.type).toBe('subscribe/fetch/rejected')
    });
})
