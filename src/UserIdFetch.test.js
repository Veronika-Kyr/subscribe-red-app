import React from 'react';
import { fetchIdUser } from './idUserSlice';
import nock from "nock";
import store from './store';

const id = "2f1b6bf3-f23c-47e4-88f2-e4ce89409376";
const onIDdata = [{
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
        .get(`/community/${id}`)
        .reply(200, {
            onIDdata
        });
}

describe('expectedData', () => {
    beforeAll(() => {
        mockNetworkResponse()
    });
    it('Should be able to fetch user on ID', async () => {
        const result = await store.dispatch(fetchIdUser(id))
        const res = result.payload

        expect(result.type).toBe('user/fetch/fulfilled')
        expect(res.firstName).toEqual(onIDdata.firstName)
    })
})

describe('expectedData with mistake', () => {
    const mockNetworkResponse1 = () => {
        nock('http://localhost:3000')
            .defaultReplyHeaders({
                'access-control-allow-origin': '*',
                'access-control-allow-credentials': 'true'
            })
            .get(`/community/57`)
            .reply(404);
    }
    mockNetworkResponse1();

    it('Should be able to fetch on ID with mistake', async () => {
        const result = await store.dispatch(fetchIdUser('57'))
        expect(result.type).toBe('user/fetch/rejected')
    })
})



