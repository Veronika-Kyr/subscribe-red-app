import React from 'react';
import { fetchUsers } from './userSlice';
import nock from "nock";
import store from './store';

const data = [{
    id: "2f1b6bf3-f23c-47e4-88f2-e4ce89409376",
    avatar: "http://localhost:3000/avatars/avatar1.png",
    firstName: "Mary",
    lastName: "Smith",
    position: "Lead Designer at Company Name",
    citate: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolor.",
}];

const mockNetworkResponse = () => {
    nock('http://localhost:3000')
        .defaultReplyHeaders({
            'access-control-allow-origin': '*',
            'access-control-allow-credentials': 'true'
        })
        .get('/community')
        .reply(200, {
            data
        });
}

describe('expectedData for users', () => {
    mockNetworkResponse()

    it('Should be able to fetch users correctly', async () => {
        const result = await store.dispatch(fetchUsers())
        const res = result.payload
        expect(result.type).toBe('users/fetch/fulfilled')
        expect(res.firstName).toEqual(data.firstName)
    })
})

describe('expectedData of users with  mistake', () => {
    const mockNetworkResponse1 = () => {
        nock('http://localhost:3000')
            .defaultReplyHeaders({
                'access-control-allow-origin': '*',
                'access-control-allow-credentials': 'true'
            })
            .get(`/community`)
            .reply(500);
    }
    mockNetworkResponse1();

    it('Should be able to fetch users with mistake', async () => {
        const result = await store.dispatch(fetchUsers())
        expect(result.type).toBe('users/fetch/rejected')
    })
})


