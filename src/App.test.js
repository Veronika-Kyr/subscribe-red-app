import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from './App';
import React from 'react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store';


describe('component', () => {
  test('full app rendering/navigating', async () => {
    render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );
    expect(screen.getByText('Join Our Program')).toBeInTheDocument();
    await userEvent.click(screen.queryByText('Community'));
    expect(screen.getByText('proud of our products', { exact: false })).toBeInTheDocument();
    await userEvent.click(screen.queryByText('Main'));
    expect(screen.getByText('Join Our Program')).toBeInTheDocument();
  })
  test('landing on a bad page', () => {
    const badRoute = '/some/bad/route'
    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>,
    )
    expect(screen.getByText('Page Not Found')).toBeInTheDocument()
  })
})
