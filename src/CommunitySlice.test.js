import React from 'react';
import { waitFor } from '@testing-library/react';
import sectionSlice from './sectSlice';
import store from './store'


test('it should render Community with section', async () => {
    store.dispatch(sectionSlice.actions.shouldShow({ showSect: false }));
    await waitFor(() => { expect(store.getState().section.showSect).toBe(false) });
})


